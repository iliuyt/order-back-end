/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */

const moment = require('moment');

module.exports = app => {
    const DataTypes = app.Sequelize;

    const sequelize = app.model;

    // 

    const Model = app.model.define('tbSubjectTime', {
        // ID
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        // 课程ID
        subjectId: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            defaultValue: '0',
            field: 'subject_id'
        },
        // 课程名称
        subjectName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'subject_name'
        },
        // 教师ID
        teacherId: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            defaultValue: '0',
            field: 'teacher_id'
        },
        // 老师名称
        teacherName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'teacher_name'
        },
        // 课程时间长度(分钟)
        subjectTime: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            defaultValue: '0',
            field: 'subject_time'
        },
        // 预约时间
        orderTime: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            field: 'order_time'
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
        tableName: 'tb_subject_time',
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
