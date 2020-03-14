'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    /**
     * 获取所有角色
     * @returns {Promise<void>}
     */
    async all() {
        let { success, service } = this.ctx;
        let data = await service.roleService.getRoleAll();

        return success({
            message: '获取所有角色成功',
            data
        });
    }
    /**
     * 角色列表
     * @returns {Promise<void>}
     */
    async list() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.roleService.getRoleList(query);

        return success({
            message: '获取角色列表成功',
            data: Object.assign({}, query, { rows, total })
        });
    }
    /**
     * 新增角色
     * @returns {Promise<void>}
     */
    async add() {
        let { success, body, service } = this.ctx;
        let data = await service.roleService.addRole(body);

        return success({
            message: '新增角色成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 修改角色
     * @returns {Promise<void>}
     */
    async update() {
        let { success, body, service } = this.ctx;
        let data = await service.roleService.updateRole(body);

        return success({
            message: '修改角色成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 禁用角色
     * @returns {Promise<void>}
     */
    async disable() {
        let { success, body, service } = this.ctx;
        let data = await service.roleService.updateRole({
            id: body.id,
            status: 0
        });

        return success({
            message: '禁用角色成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 启用角色
     * @returns {Promise<void>}
     */
    async enable() {
        let { success, body, service } = this.ctx;
        let data = await service.roleService.updateRole({
            id: body.id,
            status: 1
        });

        return success({
            message: '启用角色成功',
            data: Object.assign({}, data)
        });
    }

    /**
     * 获取角色权限
     * @returns {Promise<void>}
     */
    async getRolePrivilegs() {
        let { success, query, service } = this.ctx;
        let data = await service.roleService.getRolePrivilegs(query);

        return success({
            message: '获取角色权限成功',
            data: data
        });
    }

    async setRolePrivilegs() {
        let { success, body, service } = this.ctx;

        await service.roleService.setRolePrivilegs(body);

        return success({
            message: '设置角色权限成功'
        });
    }
}

module.exports = UserController;
