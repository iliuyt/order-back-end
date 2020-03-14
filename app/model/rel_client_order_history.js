/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */

const moment = require('moment');

module.exports = app => {
    const DataTypes = app.Sequelize;

    const sequelize = app.model;

    // 

    const Model = app.model.define('relClientOrderHistory', {
        // ID
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        // 客户id
        clientId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            field: 'client_id'
        },
        // 预约日期
        orderDate: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'order_date'
        },
        // 预约课程时间
        subjectTimeId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            field: 'subject_time_id'
        },
        // 状态 0取消 1预约
        action: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            field: 'action'
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
        tableName: 'rel_client_order_history',
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
