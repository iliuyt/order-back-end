/*
 * @Author: lkspc
 * @Date: 2017-09-27 16:19:34
 * @Last Modified by: lkspc
 * @Last Modified time: 2017-09-28 00:46:48
 */
/* eslint-disable */
'use strict';

const SequelizeAuto = require('./sequelize-auto');
const Sequelize = require('sequelize');
const async = require('async');
const _ = require('lodash');
const SqlString = require('./sequelize-auto/sql-string');


class EggSequelizeAuto extends SequelizeAuto {

    async getComment(tables) {

        let sequelize = new Sequelize('information_schema', this.username, this.password, this.options || {});
        
        let tableCommentSql = `select TABLE_NAME as tableName,TABLE_COMMENT as comment from TABLES where TABLE_SCHEMA='${this.sequelize.config.database}' and TABLE_NAME in ('${tables.join('\',\'')}')`;
        let columnCommentSql = `select TABLE_NAME as tableName, COLUMN_NAME as columnName,COLUMN_COMMENT as comment from COLUMNS where TABLE_SCHEMA='${this.sequelize.config.database}' and TABLE_NAME in ('${tables.join('\',\'')}')`;
        let tComment = await sequelize.query(tableCommentSql, { type: sequelize.QueryTypes.SELECT });
        let cComment = await sequelize.query(columnCommentSql, { type: sequelize.QueryTypes.SELECT });
        let tDict = {};
        let cDict = {};
        for (let item of tComment) {
            tDict[ item.tableName ] = item.comment;
        }

        for (let item of cComment) {
            cDict[ item.tableName + '*' + item.columnName ] = item.comment;
        }
        return {
            tDict,
            cDict
        };

    }


    run(callback) {
        let self = this;
        let text = {};
        let tables = [];

        this.build(generateText);


        async function generateText(err) {
            let quoteWrapper = '"';

            if (err) {
                console.error(err);
            }

            let tableNames = _.keys(self.tables);
            let {
                tDict,
                cDict
            } = await self.getComment(tableNames);

            async.each(_.keys(self.tables), function (table, _callback) {
                let fields = _.keys(self.tables[ table ]),
                    spaces = '';

                for (let x = 0; x < self.options.indentation; ++x) {
                    spaces += self.options.spaces === true ? ' ' : '\t';
                }

                text[ table ] = '/* eslint-disable new-cap */\n';
                text[ table ] += '/* eslint-disable no-unused-vars */\n\n';
                text[ table ] += 'const moment = require(\'moment\');\n\n';
                text[ table ] += 'module.exports = app => {\n';
                text[ table ] += spaces + 'const DataTypes = app.Sequelize;\n\n';
                text[ table ] += spaces + 'const sequelize = app.model;\n\n';


                let tableName = self.options.camelCase ? _.camelCase(table) : table;
                text[ table ] += spaces + '// ' + tDict[ table ] + '\n\n';
                text[ table ] += spaces + 'const Model = app.model.define(\'' + tableName + '\', {\n';

                _.each(fields, function (field, i) {
                    let additional = self.options.additional;

                    if (additional && additional.timestamps !== undefined && additional.timestamps) {
                        if (
                            additional.createdAt && field === 'createdAt' 
                            || additional.updatedAt && field === 'updatedAt' 
                            || (additional.deletedAt && field === 'deletedAt' 
                            || additional.deletedAt === field)) {
                            return true;
                        }
                    }
                    // Find foreign key
                    let foreignKey = self.foreignKeys[ table ] && self.foreignKeys[ table ][ field ] ?
                        self.foreignKeys[ table ][ field ] : null;

                    if (_.isObject(foreignKey)) {
                        self.tables[ table ][ field ].foreignKey = foreignKey;
                    }

                    // column's attributes
                    let fieldAttr = _.keys(self.tables[ table ][ field ]);
                    let fieldName = self.options.camelCase ? _.camelCase(field) : field;

                    text[ table ] += spaces + spaces + '// ' + cDict[ table + '*' + field ] + '\n';
                    text[ table ] += spaces + spaces + fieldName + ': {\n';

                    // Serial key for postgres...
                    let defaultVal = self.tables[ table ][ field ].defaultValue;

                    // ENUMs for postgres...
                    if (self.tables[ table ][ field ].type === 'USER-DEFINED' && Boolean(self.tables[ table ][ field ].special)) {
                        self.tables[ table ][ field ].type = 'ENUM(' + self.tables[ table ][ field ].special.map(function (f) {
                            return quoteWrapper + f + quoteWrapper;
                        }).join(',') + ')';
                    }

                    let isUnique = self.tables[ table ][ field ].foreignKey && self.tables[ table ][ field ].foreignKey.isUnique;

                    let isDate = false;
                    _.each(fieldAttr, function (attr, x) {
                        if(self.tables[ table ][ field ].foreignKey){
                            self.tables[ table ][ field ].foreignKey.extra=self.tables[ table ][ field ].foreignKey.extra || self.tables[ table ][ field ].foreignKey.EXTRA;
                        }
                        let isSerialKey = self.tables[ table ][ field ].foreignKey && _.isFunction(self.dialect.isSerialKey) && self.dialect.isSerialKey(self.tables[ table ][ field ].foreignKey);

                        // We don't need the special attribute from postgresql describe table..
                        if (attr === 'special') {
                            return true;
                        }

                        if (attr === 'foreignKey') {
                            if (isSerialKey) {
                                text[ table ] += spaces + spaces + spaces + 'autoIncrement: true';
                            }
                            else if (foreignKey.isForeignKey) {
                                text[ table ] += spaces + spaces + spaces + 'references: {\n';
                                text[ table ] += spaces + spaces + spaces + spaces + 'model: \'' + self.tables[ table ][ field ][ attr ].foreignSources.target_table + '\',\n';
                                text[ table ] += spaces + spaces + spaces + spaces + 'key: \'' + self.tables[ table ][ field ][ attr ].foreignSources.target_column + '\'\n';
                                text[ table ] += spaces + spaces + spaces + '}';
                            }
                            else {
                                return true;
                            }
                        }
                        else if (attr === 'primaryKey') {
                            if (self.tables[ table ][ field ][ attr ] === true && (!_.has(self.tables[ table ][ field ], 'foreignKey') || _.has(self.tables[ table ][ field ], 'foreignKey') && Boolean(self.tables[ table ][ field ].foreignKey.isPrimaryKey)
                            )) {
                                text[ table ] += spaces + spaces + spaces + 'primaryKey: true';
                            }
                            else {
                                return true;
                            }
                        }
                        else if (attr === 'allowNull') {
                            text[ table ] += spaces + spaces + spaces + attr + ': ' + self.tables[ table ][ field ][ attr ];
                        }
                        else if (attr === 'defaultValue') {
                            if (self.sequelize.options.dialect === 'mssql' && defaultVal && defaultVal.toLowerCase() === '(newid())') {
                                defaultVal = null; // disable adding "default value" attribute for UUID fields if generating for MS SQL
                            }

                            let val_text = defaultVal;

                            if (isSerialKey) {
                                return true;
                            }

                            //mySql Bit fix
                            if (self.tables[ table ][ field ].type.toLowerCase() === 'bit(1)') {
                                val_text = defaultVal === 'b\'1\'' ? 1 : 0;
                            }
                            // mssql bit fix
                            else if (self.sequelize.options.dialect === 'mssql' && self.tables[ table ][ field ].type.toLowerCase() === 'bit') {
                                val_text = defaultVal === '((1))' ? 1 : 0;
                            }

                            if (_.isString(defaultVal)) {
                                let field_type = self.tables[ table ][ field ].type.toLowerCase();

                                if (field_type.indexOf('date') === 0 || field_type.indexOf('timestamp') === 0) {
                                    if (_.endsWith(defaultVal, '()')) {
                                        val_text = `sequelize.fn('${defaultVal.replace(/()$/, '') }')`;
                                    }
                                    else if (_.includes([ 'current_timestamp', 'current_date', 'current_time', 'localtime', 'localtimestamp' ], defaultVal.toLowerCase())) {
                                        val_text = `sequelize.literal('${defaultVal}')`;
                                    }
                                    else {
                                        val_text = quoteWrapper + val_text + quoteWrapper;
                                    }
                                }
                                else {
                                    val_text = quoteWrapper + val_text + quoteWrapper;
                                }
                            }

                            if (defaultVal === null || defaultVal === undefined) {
                                return true;
                            }
                            val_text = _.isString(val_text) && !val_text.match(/^sequelize\.[^(]+\(.*\)$/) ?
                                SqlString.escape(_.trim(val_text, '"'), null, self.options.dialect) : val_text;

                            // don't prepend N for MSSQL when building models...
                            val_text = _.trimStart(val_text, 'N');
                            text[ table ] += spaces + spaces + spaces + attr + ': ' + val_text;

                        }
                        else if (attr === 'type' && self.tables[ table ][ field ][ attr ].indexOf('ENUM') === 0) {
                            text[ table ] += spaces + spaces + spaces + attr + ': DataTypes.' + self.tables[ table ][ field ][ attr ];
                        }
                        else {
                            let _attr = (self.tables[ table ][ field ][ attr ] || ''
                            ).toLowerCase();
                            let val = quoteWrapper + self.tables[ table ][ field ][ attr ] + quoteWrapper;

                            if (_attr === 'boolean' || _attr === 'bit(1)' || _attr === 'bit') {
                                val = 'DataTypes.BOOLEAN';
                            }
                            else if (_attr.match(/^(smallint|mediumint|tinyint|int)/)) {
                                var length = _attr.match(/\(\d+\)/);

                                val = 'DataTypes.INTEGER' + (!_.isNull(length) ? length : ''
                                );

                                let unsigned = _attr.match(/unsigned/i);

                                if (unsigned) {
                                    val += '.UNSIGNED';
                                }

                                let zero = _attr.match(/zerofill/i);

                                if (zero) {
                                    val += '.ZEROFILL';
                                }
                            }
                            else if (_attr.match(/^bigint/)) {
                                val = 'DataTypes.BIGINT';
                            }
                            else if (_attr.match(/^varchar/)) {
                                var length = _attr.match(/\(\d+\)/);

                                val = 'DataTypes.STRING' + (!_.isNull(length) ? length : ''
                                );
                            }
                            else if (_attr.match(/^string|varying|nvarchar/)) {
                                val = 'DataTypes.STRING';
                            }
                            else if (_attr.match(/^char/)) {
                                var length = _attr.match(/\(\d+\)/);

                                val = 'DataTypes.CHAR' + (!_.isNull(length) ? length : ''
                                );
                            }
                            else if (_attr.match(/^real/)) {
                                val = 'DataTypes.REAL';
                            }
                            else if (_attr.match(/text|ntext$/)) {
                                val = 'DataTypes.TEXT';
                            }
                            else if (_attr.match(/^(date)/)) {
                                val = 'DataTypes.DATE';
                                isDate = true;
                            }
                            else if (_attr.match(/^(time)/)) {
                                val = 'DataTypes.TIME';
                            }
                            else if (_attr.match(/^(float|float4)/)) {
                                val = 'DataTypes.FLOAT';
                            }
                            else if (_attr.match(/^decimal/)) {
                                val = 'DataTypes.DECIMAL';
                            }
                            else if (_attr.match(/^(float8|double precision|numeric)/)) {
                                val = 'DataTypes.DOUBLE';
                            }
                            else if (_attr.match(/^uuid|uniqueidentifier/)) {
                                val = 'DataTypes.UUIDV4';
                            }
                            else if (_attr.match(/^json/)) {
                                val = 'DataTypes.JSON';
                            }
                            else if (_attr.match(/^jsonb/)) {
                                val = 'DataTypes.JSONB';
                            }
                            else if (_attr.match(/^geometry/)) {
                                val = 'DataTypes.GEOMETRY';
                            }
                            text[ table ] += spaces + spaces + spaces + attr + ': ' + val;
                        }

                        text[ table ] += ',';
                        text[ table ] += '\n';
                    });

                    if (isUnique) {
                        text[ table ] += spaces + spaces + spaces + 'unique: true,\n';
                    }

                    if (self.options.camelCase) {
                        text[ table ] += spaces + spaces + spaces + 'field: \'' + field + '\',\n';
                    }

                    if (isDate) {
                        text[ table ] += spaces + spaces + spaces + 'get() {\n';
                        text[ table ] += spaces + spaces + spaces + spaces + 'return this.getDataValue(\'' + fieldName + '\') && moment(this.getDataValue(\'' + fieldName + '\')).format(\'YYYY-MM-DD HH:mm:ss\');\n';
                        text[ table ] += spaces + spaces + spaces + '}\n';
                    }

                    // removes the last `,` within the attribute options
                    text[ table ] = text[ table ].trim().replace(/,+$/, '') + '\n';

                    text[ table ] += spaces + spaces + '}';
                    if (i + 1 < fields.length) {
                        text[ table ] += ',';
                    }
                    text[ table ] += '\n';
                });
                //去掉最后field里面的,
                if(text[ table ].substr(text[ table ].length - 2, 2) == ',\n') {
                    text[ table ] = text[ table ].substr(0, text[ table ].length - 2)
                    text[ table ] += '\n';
                }

                text[ table ] += spaces + '}';

                //conditionally add additional options to tag on to orm objects
                let hasadditional = _.isObject(self.options.additional) && _.keys(self.options.additional).length > 0;

                text[ table ] += ', {\n';

                text[ table ] += spaces + spaces + 'tableName: \'' + table + '\',\n';

                if (hasadditional) {
                    let additionalClone = _.clone(self.options.additional)
                    if(_.includes(self.options.ignoreUpdatedAt, table))
                        additionalClone.updatedAt = false
                    _.each(additionalClone, addAdditionalOption);
                }

                text[ table ] = text[ table ].trim();
                text[ table ] = text[ table ].substring(0, text[ table ].length - 1);
                text[ table ] += '\n' + spaces + '}';

                function addAdditionalOption(value, key) {
                    if (key === 'name') {
                        // name: true - preserve table name always
                        text[ table ] += spaces + spaces + 'name: {\n';
                        text[ table ] += spaces + spaces + spaces + 'singular: \'' + table + '\',\n';
                        text[ table ] += spaces + spaces + spaces + 'plural: \'' + table + '\'\n';
                        text[ table ] += spaces + spaces + '},\n';
                    }
                    else {
                        value = _.isBoolean(value) ? value : '\'' + value + '\'';
                        text[ table ] += spaces + spaces + key + ': ' + value + ',\n';
                    }
                }

                //resume normal output
                text[ table ] += ');\n\n';
                // associate
                self.options.associate = self.options.associate || [];
                var associate = self.options.associate[ table ] ?
                    (spaces + spaces + self.options.associate[ table ] + '\n'
                    ) : '';
                text[ table ] += spaces + 'Model.associate = function() {\n' + associate + spaces + '};\n';
                text[ table ] += spaces + 'return Model;\n';
                //resume normal output
                text[ table ] += '};\n';
                _callback(null);
            }, function () {
                self.sequelize.close();

                if (self.options.directory) {
                    return self.write(text, callback);
                }
                return callback(false, text);
            });
        }
    }
}


module.exports = EggSequelizeAuto;