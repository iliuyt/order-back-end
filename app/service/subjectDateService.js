const Service = require('egg').Service;

class SubjectDateService extends Service {
    /**
     * 获取课程表列表
     */
    async getSubjectDateList({ orderDate, limit = 10, offset = 0 }) {
        let { TbSubjectDate } = this.ctx.model;

        let where = {};

        if (orderDate && orderDate !== '') {
            where = {
                orderDate
            };
        }
        let recs = await TbSubjectDate.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            where: where
        });

        let { count: total, rows } = recs;

        return {
            limit,
            offset,
            total,
            rows
        };
    }

    /**
     * 新增课程表
     */
    async addSubjectDate(body) {
        let { TbSubjectDate } = this.ctx.model;
        let { orderDate, subjectTempleteId } = body;
        let data = await TbSubjectDate.create({
            orderDate,
            subjectTempleteId,
            status: 1,
            createdBy: this.ctx.user.id
        });

        return data.toJSON();
    }

    /**
     * 修改课程表
     */
    async updateSubjectDate(body) {
        let { TbSubjectDate } = this.ctx.model;

        let data = await TbSubjectDate.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('课程表不存在');
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
    }

    /**
     * 删除课程表
     */
    async removeSubjectDate(body) {
        let { TbSubjectDate } = this.ctx.model;

        let data = await TbSubjectDate.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('课程表不存在');
        }

        await data.destroy();
    }
}

module.exports = SubjectDateService;
