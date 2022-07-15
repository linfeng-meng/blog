'use strict';

const Service = require("egg").Service;
class TagsService extends Service {
    async index(params) {
        const ctx = this.ctx
        const page = params.page * 1
        const pageSize = params.pageSize * 1

        //name模糊匹配
        const queryCon = params.name ? {
            name: {
                $regex: new RegExp(params.name, 'i')
            }
        } : {}
        const totalCount = await ctx.model.Tags.find(queryCon).countDocuments()
        const data = await ctx.model.Tags.find(queryCon)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ createTime: -1 })
        return {
            data: {
                page,
                pageSize,
                totalCount,
                list: data
            }
        }

    }
    async create(params) {
        const { ctx } = this
        const oldTags = await ctx.model.Tags.findOne({ name: params.name })
        if (oldTags) {
            return {
                msg: '该标签已存在'
            }
        }
        const data = {
            ...params,
            createTime: ctx.helper.moment().unix()
        }
        const res = await ctx.model.Tags.create(data)
        return {
            data: res,
            msg: '新增成功'
        }
    }
    async update(params) {
        const { ctx } = this
        if (params.name) {
            const oldTags = await ctx.model.Tags.findOne({ _id: params.id })
            if (oldTags) {
                const oldNameTags = await ctx.model.Tags.findOne({ name: params.name });
                if (oldNameTags) {
                    return {
                        msg: "标签已存在，请重新修改",
                    };
                }
            }
            const updateData = {
                //createTime: oldTags.createTime, //不传值不修改
                updateTime: ctx.helper.moment().unix(),
                name: params.name
            }
            await ctx.model.Tags.updateOne({
                _id: params.id,
            }, updateData)
            return {
                msg: '标签修改成功'
            }

        } else {

            const oldTags = await ctx.model.Tags.findOne({ _id: params.id });
            if (!oldTags) {
                return {
                    msg: "标签不存在",
                };
            }

            await ctx.model.Tags.updateOne(
                {
                    _id: params.id,
                },
                {
                    status: params.status,
                }
            );
            return {
                msg: `标签${params.status ? "启用" : "停用"}成功`,
            };
        }

    }
    async destroy(id) {
        const ctx = this.ctx
        const oldTags = await ctx.model.Tags.findOne({ _id: id })
        if (!oldTags) {
            return {
                msg: "标签不存在"
            }
        }
        await ctx.model.Tags.deleteOne({ _id: id })
        return {
            msg: "标签删除成功"
        }

    }
    async getDetails(params) {
        const ctx = this.ctx
        const page = params.page * 1
        const pageSize = params.pageSize * 1
        const tag = await ctx.model.Tags.findById(params.id)
        const name = tag.name
        const queryCon = {tags: {$in:[name]}}
        const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();
        const data = await ctx.model.Articles.find(queryCon,'_id createTime title cover')
            .sort({
                createTime: -1,
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        return {
            data: {
                page,
                pageSize,
                totalCount,
                name,
                list: data,
            },
        };
    }
}
module.exports = TagsService;