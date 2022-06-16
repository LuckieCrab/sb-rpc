module.exports = {
    song: async function (song, client) {
        await client.request("SET_ACTIVITY", { pid: process.pid, activity: null }).catch(e => {
            log(e);
        });

        const activity = {
            details: `playing ${song.name}`,
            state: `by ${song.author}`,
            assets: {
                large_image: "sb",
                large_text: "StormBeatz",
            },
            buttons: [
                {
                    "label": "Listen along!",
                    "url": "https://discord.gg/2zSK97R4Nj"
                },
                {
                    "label": "Discord",
                    "url": "https://discord.com/invite/suUfTeATtm"
                }
            ],
            timestamps: { start: Date.now() },
            instance: true,
        };

        client.request("SET_ACTIVITY", { pid: process.pid, activity: activity }).catch(e => {
            log(e);
        });
    }
}