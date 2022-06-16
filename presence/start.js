const RPC = require('discord-rpc');
const config = require('../config.json');

module.exports = {
    start: async function () {
        const client = await new RPC.Client({ transport: 'ipc' });

        await client.login({ clientId: config.id }).catch(e => {
            log(e);
        });
        
        return client;
    }
}