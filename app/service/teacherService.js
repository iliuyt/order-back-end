const Service = require('egg').Service;
const md5 = require('md5');

class TeacherService extends Service {
    /**
     * 获取所有教师
     */
    async getTeacherAll() {
        let { TbTeacher } = this.ctx.model;

        let recs = await TbTeacher.findAll({
            where: {
                status: 1
            }
        });

        return recs;
    }
    /**
     * 获取教师列表
     */
    async getTeacherList({ name, limit = 10, offset = 0 }) {
        let { TbTeacher, Op } = this.ctx.model;

        let recs = await TbTeacher.findAndCountAll({
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
     * 新增教师
     */
    async addTeacher(body) {
        let { TbTeacher } = this.ctx.model;

        let data = await TbTeacher.create({
            name: body.name,
            description: body.description,
            status: 1,
            createdBy: this.ctx.user.id,
            updatedBy: this.ctx.user.id
        });

        return data.toJSON();
    }

    /**
     * 修改教师
     */
    async updateTeacher(body) {
        let { TbTeacher } = this.ctx.model;

        let data = await TbTeacher.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('教师不存在');
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
    }
}

module.exports = TeacherService;
