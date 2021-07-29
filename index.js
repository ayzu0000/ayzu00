const { Client, Collection } = require('discord.js');
const client = new Client();
const { token } =require('./config.json');
const { Player, Track } = require('discord-player');
const player = new Player(client, {
    ytdlDownloadOptions: { filter: "audioonly"},
});

client.player = player;
client.on("ready", () => {
    console.log(`${client.user.username} Ready!`);

    client.user.setPresence({
        activity: {
            name: "Music",
            type: 'PLAYING'
        },
        status: 'online'
    })
});

client.player.on('trackStart', (message, track)=> message.channel.send(`🎶 Đang Quẫy \`${track.title}\`...`));
client.player.on('trackAdd', (message, queue, track) => message.channel.send(`✅ Dẫ thêm \`${track.name}\` vào danh sách chờ!`));
client.player.on('playlistAdd', (message, queue, playlist) => message.channel.send(`📃 Đã thêm \`${playlist.tracks.length}\` bài hát vào danh sách chờ!`));

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
    if (message.author.bot) return;
    const prefix = ','
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.category === 'music' && !message.member.voice.channel) return message.channel.send('Vui lòng vào voice!');
        command.run(client, message, args);
    }
})

client.login(token)