'use strict';

const Controller = require('egg').Controller;

class SubjectDateController extends Controller {
    /**
     * 课程表列表
     * @returns {Promise<void>}
     */
    async list() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.subjectDateService.getSubjectDateList(query);

        return success({
            message: '获取课程表列表成功',
            data: Object.assign({}, query, { rows, total })
        });
    }
    /**
     * 新增课程表
     * @returns {Promise<void>}
     */
    async add() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectDateService.addSubjectDate(body);

        return success({
            message: '新增课程表成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 修改课程表
     * @returns {Promise<void>}
     */
    async update() {
        let { success, body, service } = this.ctx;

        await service.subjectDateService.updateSubjectDate(body);

        return success({
            message: '修改课程表成功'
        });
    }
    /**
     * 删除课程表
     * @returns {Promise<void>}
     */
    async remove() {
        let { success, body, service } = this.ctx;

        await service.subjectDateService.removeSubjectDate(body);

        return success({
            message: '删除课程表成功'
        });
    }
}

module.exports = SubjectDateController;
