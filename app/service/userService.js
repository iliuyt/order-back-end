const Service = require('egg').Service;
const md5 = require('md5');

class UserService extends Service {
    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     * @returns 返回token
     */
    async login({ username, password }) {
        let { TbUser } = this.ctx.model;

        let clientData = await TbUser.find({
            where: {
                username: username,
                password: md5(password)
            }
        });

        if (!clientData) {
            throw new this.ctx.AppError('帐号或密码错误');
        }
        if (clientData.status !== 1) {
            throw new this.ctx.AppError('帐号状态异常无法登陆');
        }

        let token = this.ctx.helper.getToken({
            id: clientData.id,
            username: clientData.username,
            permissions: ['*']
        });

        return token;
    }
    /**
     * 修改密码
     * @param password 旧密码
     * @param newPassword 新密码
     * @returns
     */
    async updpsw({ password, newPassword }) {
        let { TbUser } = this.ctx.model;

        let clientData = await TbUser.find({
            where: {
                username: this.ctx.user.username,
                password: md5(password)
            }
        });

        if (!clientData) {
            throw new this.ctx.AppError('密码错误');
        }
        clientData.password = md5(newPassword);
        await clientData.save();
    }
    /**
     * 获取用户列表
     */
    async getUserList({ username, limit = 10, offset = 0 }) {
        let { TbUser, Op } = this.ctx.model;

        let recs = await TbUser.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            where: {
                username: {
                    [Op.like]: `%${username}%`
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
     * 新增用户
     */
    async addUser(body) {
        let { TbUser } = this.ctx.model;

        let data = await TbUser.create({
            username: body.username,
            password: md5(body.password),
            roleId: body.roleId,
            status: 1,
            createdBy: this.ctx.user.id,
            updatedBy: this.ctx.user.id
        });

        return data.toJSON();
    }

    /**
     * 修改用户
     */
    async updateUser(body) {
        let { TbUser } = this.ctx.model;

        let data = await TbUser.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('用户不存在');
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
    }
}

module.exports = UserService;
