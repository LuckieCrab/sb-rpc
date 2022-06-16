const log = require("../index.js");

module.exports = {
    stop: async function (client) {
        await client.request("SET_ACTIVITY", { pid: process.pid, activity: null }).catch(e => {
            log(e);
        });
    }
}