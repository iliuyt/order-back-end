const Service = require('egg').Service;

class ClientInfoService extends Service {
    /**
   * 获取客户列表
   */
    async getClientInfoList({ realName, infoCode, limit = 10, offset = 0 }) {
        let { TbClient, Op } = this.ctx.model;

        let recs = await TbClient.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            where: {
                realName: {
                    [Op.like]: `%${realName}%`
                },
                infoCode: {
                    [Op.like]: `%${infoCode}%`
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
   * 修改客户信息
   */
    async updateClient(body) {
        let { TbClient } = this.ctx.model;

        let data = await TbClient.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('用户不存在');
        }

        if (body.isOrder === 1) {
            body.cancelCount = 0;
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
    }
}

module.exports = ClientInfoService;
