const Service = require('egg').Service;

class SubjectService extends Service {
    /**
     * 获取所有课程
     */
    async getSubjectAll() {
        let { TbSubject } = this.ctx.model;

        let recs = await TbSubject.findAll({
            where: {
                status: 1
            }
        });

        return recs;
    }
    /**
     * 获取课程列表
     */
    async getSubjectList({ name, limit = 10, offset = 0 }) {
        let { TbSubject, Op } = this.ctx.model;

        let recs = await TbSubject.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            where: {
                name: {
                    [Op.like]: `%${name}%`
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
     * 新增课程
     */
    async addSubject(body) {
        let { TbSubject } = this.ctx.model;

        let data = await TbSubject.create({
            name: body.name,
            description: body.description,
            status: 1,
            createdBy: this.ctx.user.id,
            updatedBy: this.ctx.user.id
        });

        return data.toJSON();
    }

    /**
     * 修改课程
     */
    async updateSubject(body) {
        let { TbSubject } = this.ctx.model;

        let data = await TbSubject.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('课程不存在');
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
    }
}

module.exports = SubjectService;
