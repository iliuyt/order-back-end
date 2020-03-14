/* eslint-disable */

const EggSequelizeAuto = require("./lib/egg-sequelize-auto");
const config = require("./config/config.local");

function getAssociate(join) {
    function toFieldName(name) {
        return name.replace(/_(\w{1})/g, function(m, g) {
            return String(g).toLocaleUpperCase();
        });
    }

    function toTableName(name) {
        return toFieldName(name).replace(/(^\w{1})/g, function(m, g) {
            return String(g).toLocaleUpperCase();
        });
    }

    let ret = {};

    for (let key in join) {
        join[key].map(({ targetKeyTable, foreignKey, targetKey, isMany }) => {
            let currentModelStr = toTableName(key);
            let modelStr = toTableName(targetKeyTable);
            let foreignKeyStr = toFieldName(foreignKey);
            let targetKeyStr = toFieldName(targetKey);

            // 此处\r\n是为什么格式添加，避免eslint报错，首行不需要添加
            ret[key] = ret[key] ? (ret[key] += "\r\n        ") : "";
            ret[targetKeyTable] = ret[targetKeyTable] ? (ret[targetKeyTable] += "\r\n        ") : "";

            ret[
                key
            ] += `Model.belongsTo(app.model.${modelStr}, { foreignKey: '${foreignKeyStr}', targetKey: '${targetKeyStr}' });`;
            ret[targetKeyTable] += `Model.${
                isMany ? "hasMany" : "hasOne"
            }(app.model.${currentModelStr}, { foreignKey: '${foreignKeyStr}' });`;
        });
    }

    return ret;
}

let join = {
};

let associate = getAssociate(join);

let { database, host, port, dialect, username, password } = config().sequelize;

// With options:
const auto = new EggSequelizeAuto(database, username, password, {
    host,
    dialect,
    port,
    additional: {
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
        //...
    },
    //需要过滤 添加UpdatedAt 的表名
    ignoreUpdatedAt: [
        "tb_conf",
        "tb_user",
        "tb_subject_date",
        "rel_role_privilegs",
        "rel_client_order",
        "rel_client_order_history",
        "tb_client_order_checked",
    ],
    directory: "./app/model",
    camelCase: true,
    spaces: true,
    indentation: 4,
    tables: [
        "tb_client_order_checked",
        "tb_conf",
        "tb_user",
        "tb_role",
        "tb_teacher",
        "tb_privileg",
        "tb_subject",
        "tb_client",
        "tb_subject_time",
        "tb_subject_templete",
        "tb_subject_date",
        "rel_role_privilegs",
        "rel_client_order",
        "rel_client_order_history"
    ],
    associate
    // associate: {
    // user {id,user_code} rel_user_role{ user_no role_no} role {id,role_code}
    // user hasOne foreignKey user_no  role hasOne foreignKey role_no
    // rel_user_role belongsTo foreignKey user_no targetKey user_code
    // rel_user_role belongsTo foreignKey role_no targetKey role_code

    // rel_user_role 需要设置targetKey,用于对应user表的user_code 和role表的role_code,
    // 否则默认会对应到id上
    // belongsTo会强制给当前表加上tableId,

    // 什么时候使用hasOne，什么时候使用belongsTo？
    // foreignKey属于当前表的字段使用belongsTo，否则使用hasOne

    // left join 和 inner join
    // include.required=true  为inner join
    // include.required=false  为left join
    // 默认值为true
    //
    // wx_qrcode: `Model.belongsTo(app.model.XSceneBatch, { foreignKey: 'batchId'});`,
    //
    // rel_event_scene: `Model.belongsTo(app.model.XEvent, { foreignKey: 'eventId'});
    // Model.belongsTo(app.model.XScene, { foreignKey: 'sceneId'});`,
    //
    // rel_event_card: `Model.belongsTo(app.model.XEvent, { foreignKey: 'eventId'});
    // Model.belongsTo(app.model.XCard, { foreignKey: 'cardId'});
    // Model.hasMany(app.model.RelEventScene, { foreignKey: 'sceneId' });`,
    //
    //
    // wx_custom_news: `Model.hasMany(app.model.WxCustomNewsDetail, { foreignKey: 'customNewsId' });`,
    // wx_custom_news_detail: `Model.belongsTo(app.model.WxCustomNews, { foreignKey: 'customNewsId' });`,
    //
    // x_scene: `Model.belongsTo(app.model.XSceneUseType, { foreignKey: 'useTypeId' });
    // Model.hasOne(app.model.RelEventScene, { foreignKey: 'sceneId' });`,
    //
    // x_scene_batch: `Model.hasMany(app.model.WxQrcode, { foreignKey: 'batchId' });
    // Model.belongsTo(app.model.XScene, { foreignKey: 'sceneId'});`,
    //
    // x_scene_use_type: `Model.hasMany(app.model.XScene, { foreignKey: 'useTypeId' });`,
    //
    // x_event: `Model.hasMany(app.model.XEventPrize, { foreignKey: 'eventId' });
    // Model.hasOne(app.model.RelEventScene, { foreignKey: 'eventId' });`,
    //
    // x_subject: `Model.belongsTo(app.model.XSubjectChannel, { foreignKey: 'channelId' });
    // Model.belongsTo(app.model.WxOas, { foreignKey: 'appid', targetKey:'appid' });`,
    //
    // x_subject_channel: `Model.hasMany(app.model.XSubject, { foreignKey: 'channelId' });`,
    //
    // wx_oas: `Model.hasOne(app.model.XSubject, { foreignKey: 'appid' });`,
    //
    // x_member_card: `Model.hasOne(app.model.RelMemberCardSku, { foreignKey: 'memberCardId' });`,
    // rel_member_card_sku: `Model.belongsTo(app.model.XMemberCard, { foreignKey: 'memberCardId', targetKey: 'id' });`,

    // x_member_card: `Model.hasOne(app.model.RelMemberCardSku, { foreignKey: 'memberCardId' });`,
    // rel_member_card_sku: `Model.belongsTo(app.model.XMemberCard, { foreignKey: 'memberCardId', targetKey: 'id' });`,
    // rel_put_card_member_card: `Model.belongsTo(app.model.XMemberCard, { foreignKey: 'memberCardId', targetKey: 'id' });`,
    // x_put_card: `Model.belongsTo(app.model.XCard, { foreignKey: 'cardId', targetKey: 'id' });`,
    // x_card_rule: `Model.belongsTo(app.model.XCard, { foreignKey: 'cardId', targetKey: 'id' });`,

    // x_point: `Model.hasOne(app.model.RelEventPoint, { foreignKey: 'pointId' });`,
    //
    // rel_event_point: `Model.belongsTo(app.model.XEvent, { foreignKey: 'eventId'});
    // Model.belongsTo(app.model.XPoint, { foreignKey: 'pointId'});`,
    //
    // x_point_exchange_record: `Model.belongsTo(app.model.XEvent, { foreignKey: 'eventId'});
    // Model.belongsTo(app.model.XPoint, { foreignKey: 'pointId'});`,
    // }
});


auto.run(function(err) {
    if (err) {
        throw err;
    }

    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});
