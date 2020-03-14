'use strict';

const Controller = require('egg').Controller;

class SubjectTimeController extends Controller {
    /**
     * 获取所有预约课程
     * @returns {Promise<void>}
     */
    async all() {
        let { success, service } = this.ctx;
        let data = await service.subjectTimeService.getSubjectTimeAll();

        return success({
            message: '获取所有预约课程成功',
            data
        });
    }
    /**
     * 预约课程列表
     * @returns {Promise<void>}
     */
    async list() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.subjectTimeService.getSubjectTimeList(query);

        return success({
            message: '获取预约课程列表成功',
            data: Object.assign({}, query, { rows, total })
        });
    }
    /**
     * 新增预约课程
     * @returns {Promise<void>}
     */
    async add() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTimeService.addSubjectTime(body);

        return success({
            message: '新增预约课程成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 修改预约课程
     * @returns {Promise<void>}
     */
    async update() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTimeService.updateSubjectTime(body);

        return success({
            message: '修改预约课程成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 禁用预约课程
     * @returns {Promise<void>}
     */
    async disable() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTimeService.updateSubjectTime({
            id: body.id,
            status: 0
        });

        return success({
            message: '禁用预约课程成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 启用预约课程
     * @returns {Promise<void>}
     */
    async enable() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTimeService.updateSubjectTime({
            id: body.id,
            status: 1
        });

        return success({
            message: '启用预约课程成功',
            data: Object.assign({}, data)
        });
    }
}

module.exports = SubjectTimeController;
