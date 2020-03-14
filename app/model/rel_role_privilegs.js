/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */

const moment = require('moment');

module.exports = app => {
    const DataTypes = app.Sequelize;

    const sequelize = app.model;

    // 

    const Model = app.model.define('relRolePrivilegs', {
        // ID
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        // 角色id
        roleId: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            defaultValue: '0',
            field: 'role_id'
        },
        // 权限ID
        privilegId: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            defaultValue: '0',
            field: 'privileg_id'
        },
        // 状态 0禁用 1启用
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            field: 'status'
        },
        // 创建人
        createdBy: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'created_by'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'created_at',
            get() {
                return this.getDataValue('createdAt') && moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        tableName: 'rel_role_privilegs',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: false,
        deletedAt: 'deleted_at'
    });

    Model.associate = function() {
    };
    return Model;
};
