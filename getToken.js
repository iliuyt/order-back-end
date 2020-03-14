const jsonWebToken = require('jsonwebtoken');
let exp = Math.floor(Date.now() / 1000) + 3600 * 24 * 365 * 10;

let token = jsonWebToken.sign(
    {
        exp: exp,
        data: {
            name: 'weapp'
        }
    },
    '1234567890'
);

console.log(token);
