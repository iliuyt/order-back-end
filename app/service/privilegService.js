const Service = require('egg').Service;

class PrivilegService extends Service {
    /**
     * 获取所有权限
     */
    async getPrivilegAll() {
        let { TbPrivileg } = this.ctx.model;

        let recs = await TbPrivileg.findAll({
            where: {
                status: 1
            }
        });

        return recs;
    }
    /**
     * 新增权限
     */
    async addPrivileg(body) {
        let { TbPrivileg } = this.ctx.model;

        let data = await TbPrivileg.create({
            name: body.name,
            description: body.description,
            code: body.code,
            parentId: body.parentId,
            status: 1,
            createdBy: this.ctx.user.id,
            updatedBy: this.ctx.user.id
        });

        return data.toJSON();
    }

    /**
     * 修改权限
     */
    async updatePrivileg(body) {
        let { TbPrivileg } = this.ctx.model;

        let data = await TbPrivileg.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('权限不存在');
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
        return data.toJSON();
    }

    /**
     * 删除权限
     */
    async removePrivileg(body) {
        let { TbPrivileg } = this.ctx.model;

        let data = await TbPrivileg.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('权限不存在');
        }

        await data.destroy({});
    }
}

module.exports = PrivilegService;
