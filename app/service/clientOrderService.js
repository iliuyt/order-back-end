const Service = require('egg').Service;
const moment = require('moment');

class ClientOrderService extends Service {


    /**
   * 修改预约课程状态
   */
    async updateClientOrder(body) {
        let { RelClientOrder } = this.ctx.model;

        let data = await RelClientOrder.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('预约不存在');
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
    }
    /**
   * 获取预定的课程
   */
    async getOrderSubjects({ realName, infoCode, subjectName, teachName, beginDate, endDate, limit = 10, offset = 0 }) {
        let { TbClient, TbSubjectTime, RelClientOrder, Op } = this.ctx.model;

        let rtn = {
            limit,
            offset,
            total: 0,
            rows: []
        };

        let clientWhere = {};

        if (realName) {
            clientWhere.realName = {
                [Op.like]: `%${realName}%`
            };
        }
        if (infoCode) {
            clientWhere.infoCode = infoCode;
        }
        let clientRecs = await TbClient.findAll({
            where: clientWhere
        });

        if (!clientRecs) {
            return rtn;
        }

        let subjectWhere = {};

        if (subjectName) {
            subjectWhere.subjectName = {
                [Op.like]: `%${subjectName}%`
            };
        }
        if (teachName) {
            subjectWhere.teachName = {
                [Op.like]: `%${teachName}%`
            };
        }
        let subjectRecs = await TbSubjectTime.findAll({
            where: subjectWhere
        });

        if (!subjectRecs) {
            return rtn;
        }

        let where = {
            clientId: clientRecs.map(item => {
                return item.id;
            }),
            subjectTimeId: subjectRecs.map(item => {
                return item.id;
            })
        };

        if (beginDate && endDate && beginDate !== '' && endDate !== '') {
            where.orderDate = {
                [Op.between]: [beginDate, endDate]
            };
        }

        let recs = await RelClientOrder.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            where
        });
        let { count: total, rows } = recs;

        let clientIds = new Set();
        let subjectTimeIds = new Set();

        rows.map(item => {
            clientIds.add(item.clientId);
            subjectTimeIds.add(item.subjectTimeId);
        });

        let clients = await TbClient.findAll({
            where: {
                id: Array.from(clientIds)
            }
        });

        let subjectTimes = await TbSubjectTime.findAll({
            where: {
                id: Array.from(subjectTimeIds)
            }
        });

        rows = rows.map(item => {
            let client = clients.find(x => x.id === item.clientId);
            let subjectTime = subjectTimes.find(x => x.id === item.subjectTimeId);

            let data = item.dataValues;

            data.realName = client.realName;
            data.infoCode = client.infoCode;
            data.subjectName = subjectTime.subjectName;
            data.teacherName = subjectTime.teacherName;
            data.subjectTime = subjectTime.subjectTime;
            data.orderTime = subjectTime.orderTime;
            data.createdAt = moment(data.created_at).format('YYYY-MM-DD HH:mm:ss');
            data.updatedAt = moment(data.updated_at).format('YYYY-MM-DD HH:mm:ss');
            return data;
        });

        return {
            limit,
            offset,
            total,
            rows
        };
    }
}

module.exports = ClientOrderService;
