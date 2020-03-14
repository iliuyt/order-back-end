/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */

const moment = require('moment');

module.exports = app => {
    const DataTypes = app.Sequelize;

    const sequelize = app.model;

    // 

    const Model = app.model.define('tbConf', {
        // ID
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        // 配置key
        confKey: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'conf_key'
        },
        // 配置value
        confValue: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            defaultValue: '',
            field: 'conf_value'
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
        tableName: 'tb_conf',
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
