const jsonWebToken = require('jsonwebtoken');

module.exports = {
    /**
     * 获取jwt token
     */
    getToken(data) {
        // 获取新token
        let { defaultTime, secret } = this.config.jwtRefresh;
        let exp = Math.floor(Date.now() / 1000) + defaultTime;
        const userToken = {
            exp: exp,
            data: data
        };

        return {
            token: jsonWebToken.sign(userToken, secret),
            exp: exp
        };
    }
};
