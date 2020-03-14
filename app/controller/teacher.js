'use strict';

const Controller = require('egg').Controller;

class TeacherController extends Controller {
    /**
     * 获取所有教师
     * @returns {Promise<void>}
     */
    async all() {
        let { success, service } = this.ctx;
        let data = await service.teacherService.getTeacherAll();

        return success({
            message: '获取所有教师成功',
            data
        });
    }
    /**
     * 教师列表
     * @returns {Promise<void>}
     */
    async list() {
        let defaultQueryArg = { limit: 10, offset: 0 };
        let { success, service } = this.ctx;
        let query = Object.assign({}, defaultQueryArg, this.ctx.query);
        let { rows, total } = await service.teacherService.getTeacherList(query);

        return success({
            message: '获取教师列表成功',
            data: Object.assign({}, query, { rows, total })
        });
    }
    /**
     * 新增教师
     * @returns {Promise<void>}
     */
    async add() {
        let { success, body, service } = this.ctx;
        let data = await service.teacherService.addTeacher(body);

        return success({
            message: '新增教师成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 修改教师
     * @returns {Promise<void>}
     */
    async update() {
        let { success, body, service } = this.ctx;
        let data = await service.teacherService.updateTeacher(body);

        return success({
            message: '修改教师成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 禁用教师
     * @returns {Promise<void>}
     */
    async disable() {
        let { success, body, service } = this.ctx;
        let data = await service.teacherService.updateTeacher({
            id: body.id,
            status: 0
        });

        return success({
            message: '禁用教师成功',
            data: Object.assign({}, data)
        });
    }
    /**
     * 启用教师
     * @returns {Promise<void>}
     */
    async enable() {
        let { success, body, service } = this.ctx;
        let data = await service.teacherService.updateTeacher({
            id: body.id,
            status: 1
        });

        return success({
            message: '启用教师成功',
            data: Object.assign({}, data)
        });
    }

}

module.exports = TeacherController;
