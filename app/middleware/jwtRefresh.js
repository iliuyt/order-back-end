const jsonWebToken = require('jsonwebtoken');

module.exports = options => {
    return async (ctx, next) => {
        if (!ctx.headers.authorization && !ctx.body.authorization && !ctx.query.authorization) {
            throw new ctx.AppError('token 未找到');
        }

        let token = ctx.headers.authorization || ctx.body.authorization || ctx.query.authorization;
        let decoded = jsonWebToken.verify(token, options.secret);

        // 设置用户信息
        ctx.user = decoded.data;
        let diff = decoded.exp - Date.parse(new Date()) / 1000;

        // 小于30分钟更换token

        if (diff < options.refreshTime) {
            let newToken = ctx.helper.getToken(decoded.data);

            ctx.set(options.refreshAuthName, newToken.token);
            ctx.set('Access-Control-Expose-Headers', options.refreshAuthName);
        }

        return next();
    };
};
