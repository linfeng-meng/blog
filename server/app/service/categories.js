'use strict';

const Service = require("egg").Service;
class CategoriesService extends Service {
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
        const totalCount = await ctx.model.Categories.find(queryCon).countDocuments()
        const data = await ctx.model.Categories.find(queryCon)
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
        const oldCategories = await ctx.model.Categories.findOne({ name: params.name })
        if (oldCategories) {
            return {
                msg: '该分类已存在'
            }
        }
        const data = {
            ...params,
            createTime: ctx.helper.moment().unix()
        }
        const res = await ctx.model.Categories.create(data)
        return {
            data: res,
            msg: '新增成功'
        }
    }
    async update(params) {
        const { ctx } = this
        const oldCategories = await ctx.model.Categories.findOne({ _id: params.id })
        if (oldCategories) {
            const oldNameCategories = await ctx.model.Categories.findOne({ name: params.name });
            if (oldNameCategories) {
                return {
                    msg: "分类已存在，请重新修改",
                };
            }
        }
        const updateData = {
            //createTime: oldCategories.createTime, //不传值不修改
            updateTime: ctx.helper.moment().unix(),
            name: params.name
        }
        await ctx.model.Categories.updateOne({
            _id: params.id,
        }, updateData)
        return {
            msg: '分类修改成功'
        }

    }
    async destroy(id) {
        const ctx = this.ctx
        const oldCategories = await ctx.model.Categories.findOne({ _id: id })
        if (!oldCategories) {
            return {
                msg: "分类不存在"
            }
        }
        await ctx.model.Categories.deleteOne({ _id: id })
        return {
            msg: "分类删除成功"
        }

    }
    async getDetails(params) {
        const ctx = this.ctx
        const page = params.page * 1
        const pageSize = params.pageSize * 1
        const category = await ctx.model.Categories.findById(params.id)
        const name = category.name
        const queryCon = { categories: name }
        const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();
        const data = await ctx.model.Articles.find(queryCon, '_id createTime title cover')
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
module.exports = CategoriesService;