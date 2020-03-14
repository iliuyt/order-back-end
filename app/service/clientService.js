const Service = require('egg').Service;

class ClientService extends Service {
    async getUserInfo({ openid }) {
        let { TbClient } = this.ctx.model;

        let clientModel = await TbClient.find({
            where: {
                openid
            }
        });

        return clientModel;
    }

    async setWxUserInfo({ openid, nickName, avatarUrl, gender, province, city, country }) {
        let { TbClient } = this.ctx.model;

        let clientModel = await TbClient.find({
            where: {
                openid
            }
        });

        if (!clientModel) {
            let data = await TbClient.create({
                openid,
                nickName,
                avatarUrl,
                gender,
                province,
                city,
                country,
                status: 1
            });

            return data;
        }
        clientModel.nickName = nickName;
        clientModel.avatarUrl = avatarUrl;
        clientModel.gender = gender;
        clientModel.province = province;
        clientModel.city = city;
        clientModel.country = country;
        await clientModel.save();
        return clientModel;
    }

    async setUserInfo({ openid, realName, sex, age, idCard, email, infoCode, phone, address }) {
        let { TbClient } = this.ctx.model;

        let clientModel = await TbClient.find({
            where: {
                openid
            }
        });

        clientModel.realName = realName;
        clientModel.sex = sex;
        clientModel.age = age;
        clientModel.idCard = idCard;
        clientModel.email = email;
        clientModel.infoCode = infoCode;
        clientModel.phone = phone;
        clientModel.address = address;

        await clientModel.save();

        return clientModel;
    }

    async saveOrderSubjects({ clientId, orderDate, ids, isRemeber }) {
        let { RelClientOrder, RelClientOrderHistory, TbClientOrderChecked } = this.ctx.model;
        let clientOrders = [];
        let clientOrderHistory = [];
        let clientOrderChecked = [];

        ids.map(id => {
            clientOrders.push({
                clientId,
                orderDate,
                subjectTimeId: id,
                status: 1
            });

            clientOrderHistory.push({
                clientId,
                orderDate,
                subjectTimeId: id,
                action: 1
            });

            clientOrderChecked.push({
                clientId,
                subjectTimeId: id
            });
        });

        if (isRemeber) {
            // 根据日期查询模版
            let orderSubjects = await this.getOrderSubjectsByClient({
                date: orderDate,
                clientId
            });

            if (orderSubjects) {
                orderSubjects.map(x => {
                    if (!ids.includes(x.dataValues.subjectTimeId)) {
                        clientOrderChecked.push({
                            clientId,
                            subjectTimeId: x.dataValues.subjectTimeId
                        });
                    }
                });
            }

            await TbClientOrderChecked.destroy({
                where: {
                    clientId
                }
            });
            await TbClientOrderChecked.bulkCreate(clientOrderChecked);
        }

        await RelClientOrder.bulkCreate(clientOrders);
        await RelClientOrderHistory.bulkCreate(clientOrderHistory);
    }

    async getRemeberChecked({ clientId }) {
        let { TbClientOrderChecked } = this.ctx.model;

        let data = await TbClientOrderChecked.findAll({
            where: {
                clientId
            }
        });

        return data;
    }

    /**
   * 获取预定的课程
   */
    async getOrderSubjectsByClient({ clientId, date, op = '=' }) {
        let { RelClientOrder, Op } = this.ctx.model;
        let where = {
            orderDate: date,
            clientId
        };

        switch (op) {
            case '>':
                where.orderDate = {
                    [Op.gt]: date
                };
                break;
            case '>=':
                where.orderDate = {
                    [Op.gte]: date
                };
                break;
            case '<':
                where.orderDate = {
                    [Op.lt]: date
                };
                break;
            case '<=':
                where.orderDate = {
                    [Op.lte]: date
                };
                break;
            case '=':
                where.orderDate = date;
                break;
            default:
                break;
        }

        // 根据日期查询模版
        let subjects = await RelClientOrder.findAll({
            where
        });

        return subjects;
    }

    /**
   * 获取预定的课程
   */
    async getOrderSubjectsGroupByDate({ clientId, date, op = '=' }) {
        let { TbSubjectTime } = this.ctx.model;

        let orders = await this.getOrderSubjectsByClient({
            clientId,
            date,
            op
        });

        if (!orders) {
            return [];
        }
        let group = {};
        let groupKeys = new Set();
        let subjectTimeIds = new Set();

        orders.map(x => {
            if (!group[x.orderDate]) {
                group[x.orderDate] = [];
            }
            group[x.orderDate].push(x.subjectTimeId);
            subjectTimeIds.add(x.subjectTimeId);
            groupKeys.add(x.orderDate);
        });
        subjectTimeIds = Array.from(subjectTimeIds);
        groupKeys = Array.from(groupKeys);
        let subjects = await TbSubjectTime.findAll({
            where: {
                id: subjectTimeIds
            }
        });
        let subjectsKv = {};

        subjects.map(x => {
            subjectsKv[x.dataValues.id] = x.dataValues;
        });
        let rtnList = [];

        groupKeys.map(key => {
            let list = [];

            group[key].map(id => {
                list.push(subjectsKv[id]);
            });
            rtnList.push({
                date: key,
                list
            });
        });

        return rtnList;
    }
    /**
   * 搜索课程
   */
    async searchOrderSubjects({ clientId, date, subjectId, teacherId }) {
        let { TbSubjectTemplete, TbSubjectTime, TbSubjectDate } = this.ctx.model;

        let templeteData = null;
        // 根据日期查询模版
        let subjectData = await TbSubjectDate.find({
            where: {
                orderDate: date
            }
        });

        if (subjectData) {
            templeteData = await TbSubjectTemplete.find({
                where: {
                    id: subjectData.subjectTempleteId
                }
            });
        } else {
            templeteData = await TbSubjectTemplete.find({
                where: {
                    isDefault: 1
                }
            });
        }

        if (!templeteData) {
            return [];
        }

        let subjectTimeIds = [];

        if (templeteData.subjectTimeIds && templeteData.subjectTimeIds !== '') {
            subjectTimeIds = templeteData.subjectTimeIds.split(',').map(x => {
                return Number(x);
            });
        }

        let where = {
            id: subjectTimeIds
        };

        if (subjectId) {
            where.subjectId = subjectId;
        }

        if (teacherId) {
            where.teacherId = teacherId;
        }

        let subjects = await TbSubjectTime.findAll({
            where
        });

        if (subjects) {
            // 根据日期查询模版
            let orderSubjects = await this.getOrderSubjectsByClient({
                date,
                clientId
            });

            let orderSubjectIds = [];

            if (orderSubjects) {
                orderSubjectIds = orderSubjects.map(x => {
                    return x.dataValues.subjectTimeId;
                });
            }
            subjects = subjects.map(x => {
                let data = x.dataValues;

                data.isOrder = orderSubjectIds.includes(data.id) ? 1 : 0;
                return data;
            });
        }

        return subjects;
    }

    /**
   * 取消课程
   */
    async cancelOrder({ clientId, date, subjectTimeId }) {
        let { TbConf, TbClient, RelClientOrder, RelClientOrderHistory } = this.ctx.model;

        await RelClientOrder.destroy({
            where: {
                clientId,
                subjectTimeId,
                orderDate: date
            }
        });
        await RelClientOrderHistory.create({
            clientId,
            orderDate: subjectTimeId,
            subjectTimeId,
            action: 0
        });

        let confModel = await TbConf.find({
            where: {
                confKey: 'CANCEL_COUNT'
            }
        });

        let clientModel = await TbClient.find({
            where: {
                id: clientId
            }
        });

        clientModel.cancelCount = clientModel.cancelCount + 1;
        clientModel.isOrder = clientModel.cancelCount >= Number(confModel.confValue) ? 0 : 1;
        await clientModel.save();
    }
}

module.exports = ClientService;
