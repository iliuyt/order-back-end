'use strict';

const Controller = require('egg').Controller;

class SubjectTempleteController extends Controller {
    /**
     * 获取所有课程模版
     * @returns {Promise<void>}
     */
    async all() {
        let { success, service } = this.ctx;
        let data = await service.subjectTempleteService.getSubjectTempleteAll();

        return success({
            message: '获取所有课程模版成功',
            data
        });
    }

    /**
     * 课程模版列表
     * @returns {Promise<void>}
     */
    async list() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.subjectTempleteService.getSubjectTempleteList(query);

        return success({
            message: '获取课程模版列表成功',
            data: Object.assign({}, query, { rows, total })
        });
    }
    /**
     * 新增课程模版
     * @returns {Promise<void>}
     */
    async add() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTempleteService.addSubjectTemplete(body);

        return success({
            message: '新增课程模版成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 修改课程模版
     * @returns {Promise<void>}
     */
    async update() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTempleteService.updateSubjectTemplete(body);

        return success({
            message: '修改课程模版成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 禁用课程模版
     * @returns {Promise<void>}
     */
    async disable() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTempleteService.updateSubjectTemplete({
            id: body.id,
            status: 0
        });

        return success({
            message: '禁用课程模版成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 启用课程模版
     * @returns {Promise<void>}
     */
    async enable() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTempleteService.updateSubjectTemplete({
            id: body.id,
            status: 1
        });

        return success({
            message: '启用课程模版成功',
            data: Object.assign({}, data)
        });
    }

    /**
     * 默认课程模版
     * @returns {Promise<void>}
     */
    async setDefault() {
        let { success, body, service } = this.ctx;
        let data = await service.subjectTempleteService.setDefaultSubjectTemplete(body);

        return success({
            message: '默认课程模版成功',
            data: Object.assign({}, data)
        });
    }
}

module.exports = SubjectTempleteController;
