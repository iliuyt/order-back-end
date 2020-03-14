const Service = require('egg').Service;

class ConfService extends Service {

    async getOpenVersion() {
        let { TbConf } = this.ctx.model;

        let confModel = await TbConf.find({
            where: {
                confKey: 'VERSION'
            }
        });

        return confModel?confModel.confValue.split(','):[];

    }

}

module.exports = ConfService;
