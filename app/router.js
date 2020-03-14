'use strict';

class XRoute {
    constructor(app) {
        this.logger = app.logger;
        this.router = app.router;
    }

    checkParam(method, param) {
        return async (ctx, next) => {
            let PropTypes = ctx.PropTypes;

            if (typeof param === 'object' && Object.keys(param).length > 0) {
                let data = method === 'get' ? ctx.query : ctx.body;

                if (method === 'get') {
                    Object.keys(data).map(key => {
                        if (typeof param[key] === 'function') {
                            let rule = param[key]();

                            if (typeof rule === 'function') {
                                rule = rule();
                            }

                            if (rule && rule.expectedType === 'string') {
                                data[key] = String(data[key]);
                            }

                            if (rule && rule.expectedType === 'number') {
                                data[key] = Number(data[key]);
                            }

                            if (rule && rule.expectedType === 'numberRange') {
                                data[key] = Number(data[key]);
                            }

                            if (rule && rule.expectedType === 'oneOf') {
                                data[key] = isNaN(Number(data[key])) ? String(data[key]) : Number(data[key]);
                            }
                        }
                    });
                }

                let checkRes = PropTypes.checkPropTypes(param, data);

                if (checkRes === false || checkRes.errMsg) {
                    throw new ctx.AppError(checkRes.errMsg);
                }
            }
            return next();
        };
    }

    addRoute(config, path = '') {
        let that = this;

        if (Array.isArray(config)) {
            return config.forEach(item => {
                path += config.path || '';

                that.addRoute(item, path + (config.path || ''));
            });
        }

        path += config.path || '';

        if (config.children && config.children.length > 0) {
            return this.addRoute(config.children, path);
        }

        let { method, handle, param } = config;

        method = method.toLocaleString();
        this.router[method](path, this.checkParam(method, param), handle);
        this.logger.info(`[Router] Register ${method.toUpperCase()} \t${path}`);
    }
}

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { controller, PropTypes } = app;

    const xRouter = new XRoute(app);

    let config = [
        {
            path: '/weapp',
            name: '小程序',
            children: [
                {
                    path: '/getOpenVersion',
                    name: '获取开放版本',
                    method: 'get',
                    handle: controller.weapp.getOpenVersion
                },
                {
                    path: '/getOpenId',
                    name: '获取opendId',
                    method: 'post',
                    handle: controller.weapp.getOpenId,
                    param: {
                        code: PropTypes.string.isRequired
                    }
                },
                {
                    path: '/getUserInfo',
                    name: '通过 openid 获取用户信息',
                    method: 'post',
                    handle: controller.weapp.getUserInfo,
                    param: {
                        openid: PropTypes.string.isRequired
                    }
                },
                {
                    path: '/setUserInfo',
                    name: '设置用户就诊信息',
                    method: 'post',
                    handle: controller.weapp.setUserInfo,
                    param: {
                        openid: PropTypes.string.isRequired,
                        realName: PropTypes.string.isRequired,
                        infoCode: PropTypes.string.isRequired,
                        sex: PropTypes.string,
                        age: PropTypes.number,
                        idCard: PropTypes.string,
                        phone: PropTypes.string,
                        address: PropTypes.string
                    }
                },
                {
                    path: '/setWxUserInfo',
                    name: '设置微信用户信息',
                    method: 'post',
                    handle: controller.weapp.setWxUserInfo,
                    param: {
                        openid: PropTypes.string.isRequired,
                        nickName: PropTypes.string,
                        avatarUrl: PropTypes.string,
                        gender: PropTypes.number,
                        province: PropTypes.string,
                        city: PropTypes.string,
                        country: PropTypes.string
                    }
                },
                {
                    path: '/searchOrderSubjects',
                    name: '获取预约课程',
                    method: 'get',
                    handle: controller.weapp.searchOrderSubjects,
                    param: {
                        date: PropTypes.string.isRequired,
                        subjectId: PropTypes.number,
                        teacherId: PropTypes.number
                    }
                },
                {
                    path: '/getOrderSubjectsGroupByDate',
                    name: '获取预定的课程',
                    method: 'get',
                    handle: controller.weapp.getOrderSubjectsGroupByDate,
                    param: {
                        clientId: PropTypes.string.isRequired,
                        date: PropTypes.string.isRequired,
                        op: PropTypes.string
                    }
                },
                {
                    path: '/cancelOrder',
                    name: '取消订单',
                    method: 'post',
                    handle: controller.weapp.cancelOrder,
                    param: {
                        clientId: PropTypes.number.isRequired,
                        date: PropTypes.string.isRequired,
                        subjectTimeId: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/saveOrderSubjects',
                    name: '保存预约课程',
                    method: 'post',
                    handle: controller.weapp.saveOrderSubjects,
                    param: {
                        clientId: PropTypes.number.isRequired,
                        isRemeber: PropTypes.number.isRequired,
                        orderDate: PropTypes.string.isRequired,
                        ids: PropTypes.arrayOf(PropTypes.number).isRequired
                    }
                },
                {
                    path: '/getRemeberChecked',
                    name: '获取记住的课程',
                    method: 'get',
                    handle: controller.weapp.getRemeberChecked,
                    param: {
                        clientId: PropTypes.number.isRequired
                    }
                }
            ]
        },
        {
            path: '/client',
            name: '客户模块',
            children: [
                {
                    path: '/clientInfo/list',
                    name: '客户信息列表',
                    method: 'get',
                    handle: controller.clientInfo.list,
                    param: {
                        realName: PropTypes.string,
                        infoCode: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },

                {
                    path: '/clientInfo/order',
                    name: '客户预定列表',
                    method: 'get',
                    handle: controller.clientInfo.order,
                    param: {
                        realName: PropTypes.string,
                        infoCode: PropTypes.string,
                        subjectName: PropTypes.string,
                        teacherName: PropTypes.string,
                        beginDate: PropTypes.string,
                        endDate: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },
                {
                    path: '/order/changeStatus',
                    name: '修改预约状态',
                    method: 'post',
                    handle: controller.clientInfo.changeOrderStatus,
                    param: {
                        id: PropTypes.number.isRequired,
                        status: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/clientInfo/changeOrder',
                    name: '启用禁用预约',
                    method: 'post',
                    handle: controller.clientInfo.changeOrder,
                    param: {
                        id: PropTypes.number.isRequired,
                        isOrder: PropTypes.number.isRequired
                    }
                }
            ]
        },
        {
            path: '/user',
            name: '用户模块',
            children: [
                {
                    path: '/login',
                    name: '登录',
                    method: 'post',
                    handle: controller.user.login,
                    param: {
                        username: PropTypes.string.isRequired,
                        password: PropTypes.string.isRequired
                    }
                },
                {
                    path: '/updpsw',
                    name: '修改密码',
                    method: 'post',
                    handle: controller.user.updpsw,
                    param: {
                        password: PropTypes.string.isRequired,
                        newPassword: PropTypes.string.isRequired
                    }
                },
                {
                    path: '/info',
                    name: '获取用户信息',
                    method: 'get',
                    handle: controller.user.info
                },
                {
                    path: '/logout',
                    name: '登出',
                    method: 'get',
                    handle: controller.user.logout
                }
            ]
        },
        {
            path: '/order',
            name: '预约管理',
            children: [
                {
                    path: '/subjectTime/all',
                    name: '预约课程列表',
                    method: 'get',
                    handle: controller.subjectTime.all
                },
                {
                    path: '/subjectTime/list',
                    name: '预约课程列表',
                    method: 'get',
                    handle: controller.subjectTime.list,
                    param: {
                        subjectName: PropTypes.string,
                        teacherName: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },
                {
                    path: '/subjectTime/add',
                    name: '新增预约课程',
                    method: 'post',
                    handle: controller.subjectTime.add,
                    param: {
                        subjectId: PropTypes.number.isRequired,
                        subjectName: PropTypes.string.isRequired,
                        teacherId: PropTypes.number.isRequired,
                        teacherName: PropTypes.string.isRequired,
                        subjectTime: PropTypes.number.isRequired,
                        orderTime: PropTypes.string.isRequired
                    }
                },
                {
                    path: '/subjectTime/update',
                    name: '修改预约课程',
                    method: 'post',
                    handle: controller.subjectTime.update,
                    param: {
                        id: PropTypes.number.isRequired,
                        subjectTime: PropTypes.number,
                        orderTime: PropTypes.string
                    }
                },
                {
                    path: '/subjectTime/disable',
                    name: '禁用预约课程',
                    method: 'post',
                    handle: controller.subjectTime.disable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/subjectTime/enable',
                    name: '启用预约课程',
                    method: 'post',
                    handle: controller.subjectTime.enable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/subjectTemplete/all',
                    name: '所有课程模版',
                    method: 'get',
                    handle: controller.subjectTemplete.all
                },
                {
                    path: '/subjectTemplete/list',
                    name: '课程模版列表',
                    method: 'get',
                    handle: controller.subjectTemplete.list,
                    param: {
                        code: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },
                {
                    path: '/subjectTemplete/add',
                    name: '新增课程模版',
                    method: 'post',
                    handle: controller.subjectTemplete.add,
                    param: {
                        code: PropTypes.string.isRequired,
                        name: PropTypes.string.isRequired,
                        subjectTimeIds: PropTypes.arrayOf(PropTypes.number).isRequired
                    }
                },
                {
                    path: '/subjectTemplete/update',
                    name: '修改课程模版',
                    method: 'post',
                    handle: controller.subjectTemplete.update,
                    param: {
                        id: PropTypes.number.isRequired,
                        subjectTimeIds: PropTypes.arrayOf(PropTypes.number)
                    }
                },
                {
                    path: '/subjectTemplete/disable',
                    name: '禁用课程模版',
                    method: 'post',
                    handle: controller.subjectTemplete.disable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/subjectTemplete/enable',
                    name: '启用课程模版',
                    method: 'post',
                    handle: controller.subjectTemplete.enable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/subjectTemplete/setDefault',
                    name: '默认课程模版',
                    method: 'post',
                    handle: controller.subjectTemplete.setDefault,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },

                {
                    path: '/subjectDate/list',
                    name: '课程表列表',
                    method: 'get',
                    handle: controller.subjectDate.list,
                    param: {
                        orderDate: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },
                {
                    path: '/subjectDate/add',
                    name: '新增课程表',
                    method: 'post',
                    handle: controller.subjectDate.add,
                    param: {
                        orderDate: PropTypes.string.isRequired,
                        subjectTempleteId: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/subjectDate/update',
                    name: '修改课程表',
                    method: 'post',
                    handle: controller.subjectDate.update,
                    param: {
                        id: PropTypes.number.isRequired,
                        subjectTempleteId: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/subjectDate/remove',
                    name: '删除课程表',
                    method: 'post',
                    handle: controller.subjectDate.remove,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                }
            ]
        },
        {
            path: '/base',
            name: '基础数据模块',
            children: [
                {
                    path: '/teacher/all',
                    name: '所有教师',
                    method: 'get',
                    handle: controller.teacher.all
                },
                {
                    path: '/teacher/list',
                    name: '教师列表',
                    method: 'get',
                    handle: controller.teacher.list,
                    param: {
                        name: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },
                {
                    path: '/teacher/add',
                    name: '新增教师',
                    method: 'post',
                    handle: controller.teacher.add,
                    param: {
                        name: PropTypes.string.isRequired,
                        description: PropTypes.string
                    }
                },
                {
                    path: '/teacher/update',
                    name: '修改教师',
                    method: 'post',
                    handle: controller.teacher.update,
                    param: {
                        id: PropTypes.number.isRequired,
                        name: PropTypes.string.isRequired,
                        description: PropTypes.string
                    }
                },
                {
                    path: '/teacher/disable',
                    name: '禁用教师',
                    method: 'post',
                    handle: controller.teacher.disable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/teacher/enable',
                    name: '启用教师',
                    method: 'post',
                    handle: controller.teacher.enable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/subject/all',
                    name: '所有课程',
                    method: 'get',
                    handle: controller.subject.all
                },
                {
                    path: '/subject/list',
                    name: '课程列表',
                    method: 'get',
                    handle: controller.subject.list,
                    param: {
                        name: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },
                {
                    path: '/subject/add',
                    name: '新增课程',
                    method: 'post',
                    handle: controller.subject.add,
                    param: {
                        name: PropTypes.string.isRequired,
                        description: PropTypes.string
                    }
                },
                {
                    path: '/subject/update',
                    name: '修改课程',
                    method: 'post',
                    handle: controller.subject.update,
                    param: {
                        id: PropTypes.number.isRequired,
                        name: PropTypes.string.isRequired,
                        description: PropTypes.string
                    }
                },
                {
                    path: '/subject/disable',
                    name: '禁用课程',
                    method: 'post',
                    handle: controller.subject.disable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/subject/enable',
                    name: '启用课程',
                    method: 'post',
                    handle: controller.subject.enable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                }
            ]
        },
        {
            path: '/system',
            name: '系统模块',
            children: [
                {
                    path: '/user/list',
                    name: '用户列表',
                    method: 'get',
                    handle: controller.user.list,
                    param: {
                        username: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },
                {
                    path: '/user/add',
                    name: '新增用户',
                    method: 'post',
                    handle: controller.user.add,
                    param: {
                        username: PropTypes.string.isRequired,
                        password: PropTypes.string.isRequired,
                        roleId: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/user/update',
                    name: '修改用户',
                    method: 'post',
                    handle: controller.user.update,
                    param: {
                        id: PropTypes.number.isRequired,
                        roleId: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/user/disable',
                    name: '禁用用户',
                    method: 'post',
                    handle: controller.user.disable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/user/enable',
                    name: '启用用户',
                    method: 'post',
                    handle: controller.user.enable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/user/resetPsw',
                    name: '重置密码',
                    method: 'post',
                    handle: controller.user.resetPsw,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/privileg/all',
                    name: '所有权限',
                    method: 'get',
                    handle: controller.privileg.all
                },
                {
                    path: '/privileg/add',
                    name: '新增权限',
                    method: 'post',
                    handle: controller.privileg.add,
                    param: {
                        name: PropTypes.string.isRequired,
                        code: PropTypes.string.isRequired,
                        parentId: PropTypes.number.isRequired,
                        description: PropTypes.string
                    }
                },
                {
                    path: '/privileg/update',
                    name: '修改权限',
                    method: 'post',
                    handle: controller.privileg.update,
                    param: {
                        id: PropTypes.number.isRequired,
                        code: PropTypes.string,
                        parentId: PropTypes.number.isRequired,
                        description: PropTypes.string
                    }
                },
                {
                    path: '/privileg/remove',
                    name: '删除权限',
                    method: 'post',
                    handle: controller.privileg.remove,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/role/all',
                    name: '所有角色',
                    method: 'get',
                    handle: controller.role.all
                },
                {
                    path: '/role/list',
                    name: '角色列表',
                    method: 'get',
                    handle: controller.role.list,
                    param: {
                        name: PropTypes.string,
                        limit: PropTypes.number,
                        offset: PropTypes.number
                    }
                },
                {
                    path: '/role/add',
                    name: '新增角色',
                    method: 'post',
                    handle: controller.role.add,
                    param: {
                        name: PropTypes.string.isRequired,
                        description: PropTypes.string
                    }
                },
                {
                    path: '/role/update',
                    name: '修改角色',
                    method: 'post',
                    handle: controller.role.update,
                    param: {
                        id: PropTypes.number.isRequired,
                        name: PropTypes.string.isRequired,
                        description: PropTypes.string
                    }
                },
                {
                    path: '/role/disable',
                    name: '禁用角色',
                    method: 'post',
                    handle: controller.role.disable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/role/enable',
                    name: '启用角色',
                    method: 'post',
                    handle: controller.role.enable,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/role/privilegs',
                    name: '角色权限',
                    method: 'get',
                    handle: controller.role.getRolePrivilegs,
                    param: {
                        id: PropTypes.number.isRequired
                    }
                },
                {
                    path: '/role/privilegs/set',
                    name: '设置角色权限',
                    method: 'post',
                    handle: controller.role.setRolePrivilegs,
                    param: {
                        roleId: PropTypes.number.isRequired,
                        pIds: PropTypes.arrayOf(PropTypes.number)
                    }
                }
            ]
        }
    ];

    xRouter.addRoute(config);
};
