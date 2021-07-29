const checkSameRoom = (message) => {
    if (!message.member.voice.channel) return message.reply('Xin hãy vào room voice!');
    if (!message.guild.me.voice.channelID || message.guild.me.voice.channelID == message.member.voice.channelID) return;
    return message.reply('Ở cung room với bot!');
}

const { MessageEmbed } = require('discord.js');
const noMusicEmbed = () => new MessageEmbed().setColor('RED').setDescription('🛑 | Bạn không chơi nhạc!');

module.exports = {
    checkSameRoom,
    noMusicEmbed,
}
