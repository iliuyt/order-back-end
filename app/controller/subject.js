'use strict';

const Controller = require('egg').Controller;

class SubjectController extends Controller {
    /**
     * 获取所有课程
     * @returns {Promise<void>}
     */
    async all() {
        let { success, service } = this.ctx;
        let data = await service.subjectService.getSubjectAll();

        return success({
            message: '获取所有课程成功',
            data
        });
    }
    /**
     * 课程列表
     * @returns {Promise<void>}
     */
    async list() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.subjectService.getSubjectList(query);

        return success({
            message: '获取课程列表成功',
            data: Object.assign({}, query, { rows, total })
        });
    }
    /**
     * 新增课程
     * @returns {Promise<void>}
     */
    async add() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectService.addSubject(body);

        return success({
            message: '新增课程成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 修改课程
     * @returns {Promise<void>}
     */
    async update() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectService.updateSubject(body);

        return success({
            message: '修改课程成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 禁用课程
     * @returns {Promise<void>}
     */
    async disable() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectService.updateSubject({
            id: body.id,
            status: 0
        });

        return success({
            message: '禁用课程成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 启用课程
     * @returns {Promise<void>}
     */
    async enable() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectService.updateSubject({
            id: body.id,
            status: 1
        });

        return success({
            message: '启用课程成功',
            data: Object.assign({}, data)
        });
    }
}

module.exports = SubjectController;
