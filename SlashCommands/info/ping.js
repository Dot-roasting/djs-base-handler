const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    memberPermissions: ['ADMINISTRATOR'],
    botPerms: ['ADMINISTRATOR'],
    botChannelPerms: ['EMBED_LINKS'],
    botOwner: true,
    serverOwner: true,
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `${client.ws.ping}ms!` });
    },
};
