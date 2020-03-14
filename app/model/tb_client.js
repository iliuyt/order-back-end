/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */

const moment = require('moment');

module.exports = app => {
    const DataTypes = app.Sequelize;

    const sequelize = app.model;

    //

    const Model = app.model.define('tbClient', {
        // ID
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        // 微信小程序openid
        openid: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'openid'
        },
        // 客户名称
        realName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'real_name'
        },
        // 性别
        sex: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: '',
            field: 'sex'
        },
        // 年龄
        age: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            field: 'age'
        },
        // 取消次数
        cancelCount: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            field: 'cancel_count'
        },
        // 身份证
        idCard: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'id_card'
        },
        // 邮箱
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'email'
        },
        // 卡号
        infoCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'info_code'
        },
        // 电话号码
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'phone'
        },
        // 地址
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'address'
        },
        // 微信昵称
        nickName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'nick_name'
        },
        // 微信头像地址
        avatarUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'avatar_url'
        },
        // 微信性别 未知、1：男、2：女
        gender: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            field: 'gender'
        },
        // 微信省份
        province: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'province'
        },
        // 微信城市
        city: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'city'
        },
        // 微信国家
        country: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'country'
        },
        // 是否可以预约 0否 1是
        isOrder: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            field: 'is_order'
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
        tableName: 'tb_client',
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
