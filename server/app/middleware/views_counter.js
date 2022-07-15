// app/middleware/error_handler.js
module.exports = () => {
    return async function viewsCounter(ctx, next) {

        var data = ctx.request.query;
        console.log(data);
        await ctx.model.Articles.updateOne(
            {
                _id: data.id,
            },
            {
                $inc: { views: 1 },
            }
        );
        await next();
    };
};
