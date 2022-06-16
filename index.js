const Discord = require('discord.js');

const config = require('./config.json');

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ], 
});

const log = function (e) {
    var date = new Date();

    const time = "["+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " @ "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds()+
        "]";
    

    const webhook = new Discord.WebhookClient({
        url: config.url
    });

    webhook.send({
        content: `**${time}**\`\`\`${e}\`\`\``
    });

    console.log(time, e);

    return;
}

module.exports.log = log;

const rpc = config.path;

let rpcClient;

const songjs = require(rpc + "song.js");
const startjs = require(rpc + "start.js");
const stopjs = require(rpc + "stop.js");

log("SB-RPC is starting up!")

client.on("error", e => {
    log(e);
});

client.on("ready", async () => {
    log("Client is ready.");
});

client.on("messageCreate", async message => {
    if(!rpcClient) {
        rpcClient = await startjs.start();
    }

    if(!message.channel.id == config.channelId) return;

    if(message.author.id != config.authorId) return;

    if(!message.embeds) return;

    if(!message.embeds[0].description) return;

    if(message.embeds[0].description.includes("The player has been disconnected due to inactivity")) {
        stopjs.stop(rpcClient);
    }

    if(!message.embeds[0].author) return;

    if(!message.embeds[0].author.name) return;

    if(message.embeds[0].author.name != "Now Playing") return;

    let info;

    async function presence () {
        let arr = message.embeds[0].description.split("**");

        let song = arr[1].split("**");

        let name;

        if(song[0].includes("(Official Music Video)")) {
            name = song[0].replace("(Official Music Video)", "");
        } else {
            name = song[0];
        }

        let author = arr[4].replace("\n", "");

        info = {
            name: name,
            author: author
        }

        await songjs.song(info, rpcClient).catch();
    }

    await presence();
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if(!oldState.channel) return;

    if(newState.id == config.authorId) {
        if(oldState.channel.id == config.vcId && !newState.channel) {
            return stopjs.stop(rpcClient);
        }

        if (oldState.channel.id == config.vcId && newState.channel.id != config.vcId) {
            return stopjs.stop(rpcClient);
        }
    }

    if(oldState.channel.id == config.vcId) {
        const channel = oldState.guild.channels.cache.get(config.vcId);

        if(!channel) return;

        if(channel.members.size < 2) {
            return stopjs.stop(rpcClient);
        }
    }
});

setTimeout(() => {
    client.login(config.token).catch(e => {
        log(e);
    });
}, 180000);