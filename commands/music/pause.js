const { checkSameRoom } = require('../../utils');
module.exports = {
    name: 'stop',
    aliases: ['s', 'pause'],
    category: 'music',
    description: 'Pause',
    run: async (client, message, args)=> {
        if (checkSameRoom(message)) return;
        await client.player.pause(message);
        await message.react('⏸️');
    },
};