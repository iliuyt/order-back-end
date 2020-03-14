module.exports = () => {
    return async (ctx, next) => {
        let { PropTypes } = ctx;

        let { ERROR_CODE } = ctx.app.config.constant;

        ctx.paramError = (model, data, message = '参数错误') => {
            let checkRes = PropTypes.checkPropTypes(model, data);

            if (checkRes === false || checkRes.errMsg) {
                throw new this.ctx.AppError(checkRes.errMsg || message);
            }
            return true;
        };

        ctx.error = ({ code, message } = {}) => {
            ctx.body = {
                code: code || ERROR_CODE.ERROR,
                message: message || '系统错误'
            };
        };

        ctx.success = ({ message, data } = {}) => {
            ctx.body = {
                code: ERROR_CODE.SUCCESS,
                message: message || '请求成功',
                data: data || ''
            };
        };

        ctx.body = ctx.request.body;

        try {
            ctx.logger.info('access', ctx.body, ctx.query);
            await next();
            if (!('code' in ctx.body) && !Buffer.isBuffer(ctx.body)) {
                return ctx.error();
            }
            return;
        } catch (error) {
            if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
                ctx.logger.warn(error.name, ctx.header.authorization || '');
                return ctx.error({
                    code: ERROR_CODE.UNLOGIN,
                    message: 'token无效'
                });
            } else if (error.name === 'AppError') {
                ctx.body = {
                    code: error.code,
                    message: error.message
                };
            } else {
                ctx.logger.error('系统异常：', error);
                ctx.error(error);
            }
        } finally {
            if (!Buffer.isBuffer(ctx.body)) {
                ctx.logger.info('access response data:', ctx.body);
            }
        }
    };
};
