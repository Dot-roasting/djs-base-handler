const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    memberPermissions: ['SEND_MESSAGES'], // Member Permission Check
    botPerms: ['SEND_MESSAGES'], // Bot Permission check in server
    botChannelPerms: ['SEND_MESSAGES'], // Bot permission check in Channel
    owner: true, // Owner Only check
    serverOwner: true, // Server Owner check

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send(`${client.ws.ping} ws ping`);
    },
};
