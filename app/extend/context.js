/**
 * 注意:
 * context中的方法，this代表当前调用的环境，this不一定是ctx
 * 如果使用 let foo=this.ctx.foo; 那么foo中的this为global
 */

class AppError extends Error {
    constructor(message, code = 0) {
        super(message);
        this.name = 'AppError';
        this.code = code;
    }
}

module.exports = {
    get AppError() {
        return AppError;
    }
};
