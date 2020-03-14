const Service = require('egg').Service;
const rp = require('request-promise');

class WeappService extends Service {
    // 获取openid
    async getOpenId({code}) {
        let { apiUrl, appid, secret } = this.config.weixin;
        let url = `${apiUrl}/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
        let data = await rp(url);

        try{
            return JSON.parse(data);
        }catch(error){
            this.ctx.logger.error(error);
            return {};
        }
    }
}

module.exports = WeappService;
