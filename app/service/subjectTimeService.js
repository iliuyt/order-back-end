const Service = require('egg').Service;

class SubjectTimeService extends Service {
    /**
     * 获取所有预约课程
     */
    async getSubjectTimeAll() {
        let { TbSubjectTime } = this.ctx.model;

        let recs = await TbSubjectTime.findAll({
            where: {
                status: 1
            }
        });

        return recs;
    }

    /**
     * 获取预约课程列表
     */
    async getSubjectTimeList({ subjectName, teacherName, limit = 10, offset = 0 }) {
        let { TbSubjectTime, Op } = this.ctx.model;

        let recs = await TbSubjectTime.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            where: {
                subjectName: {
                    [Op.like]: `%${subjectName}%`
                },
                teacherName: {
                    [Op.like]: `%${teacherName}%`
                }
            }
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
     * 新增预约课程
     */
    async addSubjectTime(body) {
        let { TbSubjectTime } = this.ctx.model;
        let { subjectId, subjectName, teacherId, teacherName, subjectTime, orderTime } = body;
        let data = await TbSubjectTime.create({
            subjectId,
            subjectName,
            teacherId,
            teacherName,
            subjectTime,
            orderTime,
            status: 1,
            createdBy: this.ctx.user.id,
            updatedBy: this.ctx.user.id
        });

        return data.toJSON();
    }

    /**
     * 修改预约课程
     */
    async updateSubjectTime(body) {
        let { TbSubjectTime } = this.ctx.model;

        let data = await TbSubjectTime.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('预约课程不存在');
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
    }
}

module.exports = SubjectTimeService;
