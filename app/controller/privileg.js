'use strict';

const Controller = require('egg').Controller;

class PrivilegController extends Controller {
    /**
     * 获取所有权限
     * @returns {Promise<void>}
     */
    async all() {
        let { success, service } = this.ctx;
        let data = await service.privilegService.getPrivilegAll();

        return success({
            message: '获取成功',
            data
        });
    }

    /**
     * 新增权限
     * @returns {Promise<void>}
     */
    async add() {
        let { success, body, service } = this.ctx;
        let data = await service.privilegService.addPrivileg(body);

        return success({
            message: '新增角色成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 修改权限
     * @returns {Promise<void>}
     */
    async update() {
        let { success, body, service } = this.ctx;
        let data = await service.privilegService.updatePrivileg(body);

        return success({
            message: '修改权限成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 删除权限
     * @returns {Promise<void>}
     */
    async remove() {
        let { success, body, service } = this.ctx;

        await service.privilegService.removePrivileg(body);

        return success({
            message: '删除成功'
        });
    }
}

module.exports = PrivilegController;
