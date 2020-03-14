'use strict';
module.exports = () => {

    const config = exports = {};

    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'x_test',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: 'lyt5217199',
        operatorsAliases: false,
        timezone: '+08:00',
        pool: {
            max: 5,
            min: 1,
            idle: 20000,
            evict: 20000,
            acquire: 20000
        }
    };

    return config;
};
