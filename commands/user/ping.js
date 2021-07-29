module.exports = {
    name: 'ping',
    category: 'user',
    run: (client, message, args) => {
        message.channel.send(`${client.ws.ping} ms`)
    }
}