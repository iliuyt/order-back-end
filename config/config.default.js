'use strict';
const constant = require('./constant');

module.exports = appInfo => {
    const config = exports = {};
    const jwtSecret = '1234567890';
    const ignoreList = ['/user/login', '/user/logout'];

    config.weixin={
        appid:'wx40e01d1053651aa2',
        secret: '655362bb676666c2e251fb45e47e8462',
        apiUrl:'https://api.weixin.qq.com'
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1527663488036_2441';
    config.constant = constant();

    config.logger = {
        dir: './logs/',
        appLogName: 'app.log',
        coreLogName: 'core.log',
        agentLogName: 'agent.log',
        errorLogName: 'error.log'
    };

    config.customLogger = {
        scheduleLogger: {
            consoleLevel: 'ERROR',
            file: './logs/schedule.log'
        }
    };


    config.security = {
        csrf: {
            enable: false
        }
    };

    config.cors = {};

    // add your config here
    config.middleware = ['request', 'jwtRefresh'];

    config.jwtRefresh = {
        ignore(ctx) {
            return ignoreList.includes(ctx.path);
        },
        secret: jwtSecret,
        refreshAuthName: 'NEW-Authorization',
        defaultTime: 3600,
        refreshTime: 1800
    };

    config.jwt = {
        ignore(ctx) {
            return ignoreList.includes(ctx.path);
        },
        secret: jwtSecret
    };

    config.cluster = {
        listen: {
            port: 7001
        }
    };
    return config;
};
