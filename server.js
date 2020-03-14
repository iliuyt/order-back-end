// server.js
const egg = require('egg');
const os = require('os');
const workers = Number(process.argv[ 2 ] || os.cpus().length);

egg.startCluster({
    workers,
    baseDir: __dirname
});