const Service = require('egg').Service;

class SubjectTempleteService extends Service {

    /**
   * 获取所有课程模版
   */
    async getSubjectTempleteAll() {
        let { TbSubjectTemplete } = this.ctx.model;

        let recs = await TbSubjectTemplete.findAll({
            where: {
                status: 1
            }
        });

        return recs;
    }
    /**
   * 获取课程模版列表
   */
    async getSubjectTempleteList({ code, name, limit = 10, offset = 0 }) {
        let { TbSubjectTemplete, Op } = this.ctx.model;

        let recs = await TbSubjectTemplete.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            where: {
                code: {
                    [Op.like]: `%${code}%`
                },
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
   * 新增课程模版
   */
    async addSubjectTemplete(body) {
        let { TbSubjectTemplete } = this.ctx.model;
        let { code, name, subjectTimeIds } = body;
        let data = await TbSubjectTemplete.create({
            code,
            name,
            subjectTimeIds: subjectTimeIds.join(','),
            status: 1,
            createdBy: this.ctx.user.id,
            updatedBy: this.ctx.user.id
        });

        return data.toJSON();
    }

    /**
   * 修改课程模版
   */
    async updateSubjectTemplete(body) {
        let { TbSubjectTemplete } = this.ctx.model;

        let data = await TbSubjectTemplete.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('课程模版不存在');
        }

        Object.keys(body).map(key => {
            if (key === 'subjectTimeIds') {
                data.subjectTimeIds = body.subjectTimeIds.join(',');
            } else {
                data[key] = body[key];
            }
        });

        await data.save();
    }

    /**
   * 默认课程模版
   */
    async setDefaultSubjectTemplete(body) {
        let { TbSubjectTemplete } = this.ctx.model;
        let data = await TbSubjectTemplete.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('课程模版不存在');
        }

        let transaction = await this.app.model.transaction();

        try {
            await TbSubjectTemplete.update(
                {
                    isDefault: 0
                },
                {
                    where: {
                        isDefault: 1
                    },
                    transaction
                }
            );

            data.isDefault = 1;

            await data.save({
                transaction
            });

            await transaction.commit();
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    }
}

module.exports = SubjectTempleteService;
