const Service = require('egg').Service;

class RoleService extends Service {
    /**
     * 获取所有角色
     */
    async getRoleAll() {
        let { TbRole } = this.ctx.model;

        let recs = await TbRole.findAll({
            where: {
                status: 1
            }
        });

        return recs;
    }
    /**
     * 获取角色列表
     */
    async getRoleList({ name, limit = 10, offset = 0 }) {
        let { TbRole, Op } = this.ctx.model;

        let recs = await TbRole.findAndCountAll({
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
     * 新增角色
     */
    async addRole(body) {
        let { TbRole } = this.ctx.model;

        let data = await TbRole.create({
            name: body.name,
            description: body.description,
            status: 1,
            createdBy: this.ctx.user.id,
            updatedBy: this.ctx.user.id
        });

        return data.toJSON();
    }

    /**
     * 修改角色
     */
    async updateRole(body) {
        let { TbRole } = this.ctx.model;

        let data = await TbRole.find({
            where: {
                id: body.id
            }
        });

        if (!data) {
            throw new this.ctx.AppError('角色不存在');
        }

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        await data.save();
    }
    /**
     * 获取角色权限列表
     */
    async getRolePrivilegs(query) {
        let sql = `
        SELECT a.id, a.parent_id AS parentId, a.name, (CASE WHEN ISNULL(b.id) THEN 0 ELSE 1 END) AS checked
        FROM tb_privileg AS a
        LEFT JOIN rel_role_privilegs AS b
        ON a.id = b.privileg_id
        AND b.deleted_at IS NULL
        AND b.role_id =${query.id} 
        ORDER BY a.id`;

        let recs = await this.ctx.model.query(sql, { type: this.ctx.model.QueryTypes.SELECT });

        return recs;
    }

    /**
     * 设置角色权限列表
     */
    async setRolePrivilegs(body) {
        let { RelRolePrivilegs } = this.ctx.model;

        let transaction = await this.app.model.transaction();

        try {
            await RelRolePrivilegs.destroy({
                where: {
                    roleId: body.roleId
                },
                transaction
            });

            let rels = body.pIds.map(id => {
                return {
                    privilegId: id,
                    roleId: body.roleId,
                    status: 1
                };
            });

            await RelRolePrivilegs.bulkCreate(rels, {
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

module.exports = RoleService;
