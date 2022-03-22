const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns the websocket ping",
    memberPermissions: ['USE_APPLICATION_COMMANDS'],
    botPerms: ['SEND_MESSAGES'],
    botChannelPerms: ['SEND_MESSAGES'],
    botOwner: false,
    serverOwner: false,
    type: 'CHAT_INPUT',
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.reply({ content: `${client.ws.ping}ms!` });
    },
};
