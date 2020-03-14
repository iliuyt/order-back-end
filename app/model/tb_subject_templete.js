/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */

const moment = require('moment');

module.exports = app => {
    const DataTypes = app.Sequelize;

    const sequelize = app.model;

    // 

    const Model = app.model.define('tbSubjectTemplete', {
        // ID
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        // 模版名称
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'name'
        },
        // 模版code
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'code'
        },
        // 课程模版ID
        subjectTimeIds: {
            type: DataTypes.STRING(4000),
            allowNull: false,
            defaultValue: '',
            field: 'subject_time_ids'
        },
        // 是否默认模版 0否 1是
        isDefault: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            defaultValue: '0',
            field: 'is_default'
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
        },
        // 修改人
        updatedBy: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'updated_by'
        },
        // 修改时间
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'updated_at',
            get() {
                return this.getDataValue('updatedAt') && moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        tableName: 'tb_subject_templete',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    Model.associate = function() {
    };
    return Model;
};
