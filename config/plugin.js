'use strict';


const path = require('path');
let propTypesPackage = path.join(__dirname, '../lib/plugin/egg-propTypes');

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
};

exports.propTypes = {
    enable: true,
    path: propTypesPackage
};
