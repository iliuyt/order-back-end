'use strict';

const Controller = require('egg').Controller;

class ClientInfoController extends Controller {
    /**
     * 客户信息列表
     * @returns {Promise<void>}
     */
    async list() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.clientInfoService.getClientInfoList(query);

        return success({
            message: '获取客户信息列表成功',
            data: Object.assign({}, query, { rows, total })
        });
    }

    /**
     * 获取客户订单列表
     * @returns {Promise<void>}
     */
    async order() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.clientOrderService.getOrderSubjects(query);

        return success({
            message: '获取客户订单列表',
            data: Object.assign({}, query, { rows, total })
        });
    }
    /**
     * 修改客户预约状态
     * @returns {Promise<void>}
     */
    async changeOrderStatus() {
        let { success, body, service } = this.ctx;
        let data = await service.clientOrderService.updateClientOrder(body);

        return success({
            message: '修改客户预约成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 启用禁用客户预约
     * @returns {Promise<void>}
     */
    async changeOrder() {
        let { success, body, service } = this.ctx;
        let data = await service.clientInfoService.updateClient(body);

        return success({
            message: '修改预约状态成功',
            data: Object.assign({}, data)
        });
    }
}

module.exports = ClientInfoController;
