'use strict';

const Controller = require('egg').Controller;

class WeappController extends Controller {
    /**
   * 获取开放版本
   * @returns {Promise<void>}
   */
    async getOpenVersion() {
        let { service, success } = this.ctx;

        let data = await service.confService.getOpenVersion();

        return success({
            message: '获取开放版本',
            data
        });
    }

    /**
   * 获取openid
   * @returns {Promise<void>}
   */
    async getOpenId() {
        let { service, body, success } = this.ctx;

        let data = await service.weappService.getOpenId(body);

        return success({
            message: '获取客户openid成功',
            data: data
        });
    }
    /**
   * 根据openid 获取用户信息
   * @returns {Promise<void>}
   */
    async getUserInfo() {
        let { body, success, service } = this.ctx;

        let data = await service.clientService.getUserInfo(body);

        return success({
            message: '获取用户信息成功',
            data: data
        });
    }
    /**
   * 设置微信用户信息
   * @returns {Promise<void>}
   */
    async setWxUserInfo() {
        let { body, success, service } = this.ctx;

        let data = await service.clientService.setWxUserInfo(body);

        return success({
            message: '设置用户信息成功',
            data
        });
    }

    /**
   * 设置用户就诊信息
   * @returns {Promise<void>}
   */
    async setUserInfo() {
        let { body, success, service } = this.ctx;

        let data = await service.clientService.setUserInfo(body);

        return success({
            message: '设置用户就诊信息成功',
            data
        });
    }

    /**
   * 查询课程
   * @returns {Promise<void>}
   */
    async searchOrderSubjects() {
        let { query, success, service } = this.ctx;

        let data = await service.clientService.searchOrderSubjects(query);

        return success({
            message: '查询课程成功',
            data
        });
    }

    /**
   * 保存课程
   * @returns {Promise<void>}
   */
    async saveOrderSubjects() {
        let { body, success, service } = this.ctx;

        await service.clientService.saveOrderSubjects(body);

        return success({
            message: '保存课程成功'
        });
    }
    /**
   * 获取记住的课程
   * @returns {Promise<void>}
   */
    async getRemeberChecked() {
        let { query, success, service } = this.ctx;

        let data = await service.clientService.getRemeberChecked(query);

        return success({
            message: '获取记住的课程',
            data
        });
    }

    /**
   * 获取预定的课程
   * @returns {Promise<void>}
   */
    async getOrderSubjectsGroupByDate() {
        let { query, success, service } = this.ctx;

        let data = await service.clientService.getOrderSubjectsGroupByDate(query);

        return success({
            message: '获取预定的课程成功',
            data
        });
    }
    /**
   * 取消预定课程成功
   * @returns {Promise<void>}
   */
    async cancelOrder() {
        let { body, success, service } = this.ctx;

        await service.clientService.cancelOrder(body);

        return success({
            message: '取消预定课程成功'
        });
    }

}

module.exports = WeappController;
