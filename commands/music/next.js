const { checkSameRoom } = require('../../utils');
module.exports = {
    name: 'next',
    aliases: ['n', 'skip'],
    category: 'music',
    description: 'Next',
    run: async (client, message, args)=> {
        if (checkSameRoom(message)) return;
        await client.player.skip(message);
        await message.react('⏭️');
    },
};