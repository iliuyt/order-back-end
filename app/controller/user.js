'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');

class UserController extends Controller {
    /**
     * 登录
     * @returns {Promise<void>}
     */
    async login() {
        let { body, service, success } = this.ctx;

        let token = await service.userService.login(body);

        return success({
            message: '登录成功',
            data: token
        });
    }

    /**
     * 修改密码
     * @returns {Promise<void>}
     */
    async updpsw() {
        let { body, service, success } = this.ctx;

        await service.userService.updpsw(body);

        return success({
            message: '修改密码成功'
        });
    }

    /**
     * 获取用户信息
     * @returns {Promise<void>}
     */
    async info() {
        this.ctx.success({
            data: this.ctx.user
        });
    }

    /**
     * 登出
     * @returns {Promise<void>}
     */
    async logout() {
        this.ctx.success();
    }

    /**
     * 用户列表
     * @returns {Promise<void>}
     */
    async list() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.userService.getUserList(query);

        return success({
            message: '获取用户成功',
            data: Object.assign({}, query, { rows, total })
        });
    }
    /**
     * 新增用户
     * @returns {Promise<void>}
     */
    async add() {
        let { success, body, service } = this.ctx;
        let data = await service.userService.addUser(body);

        return success({
            message: '新增用户成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 修改用户
     * @returns {Promise<void>}
     */
    async update() {
        let { success, body, service } = this.ctx;
        let data = await service.userService.updateUser(body);

        return success({
            message: '修改用户成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 禁用用户
     * @returns {Promise<void>}
     */
    async disable() {
        let { success, body, service } = this.ctx;
        let data = await service.userService.updateUser({
            id: body.id,
            status: 0
        });

        return success({
            message: '禁用用户成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 启用用户
     * @returns {Promise<void>}
     */
    async enable() {
        let { success, body, service } = this.ctx;
        let data = await service.userService.updateUser({
            id: body.id,
            status: 1
        });

        return success({
            message: '启用用户成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 重置密码
     * @returns {Promise<void>}
     */
    async resetPsw() {
        let { success, body, service } = this.ctx;
        let data = await service.userService.updateUser({
            id: body.id,
            password: md5('123456')
        });

        return success({
            message: '重置密码成功',
            data: Object.assign({}, data)
        });
    }
}

module.exports = UserController;
