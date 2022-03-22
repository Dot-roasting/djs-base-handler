const client = require("../index");

client.on("interactionCreate", async (interaction) => {
   try {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply({ content: "An error has occured ", ephemeral: true });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (!interaction.member.permissions.has(cmd.memberPermissions || [])) {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `You need the **\`${cmd.memberPermissions}\`** permission to use this command`, ephemeral: true })
        }
        
        if (!interaction.guild.me.permissions.has(cmd.botPerms || [])) {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `I need the **\`${cmd.botPerms}\`** permission to use this command`, ephemeral: true })
        }
        
        if (cmd.botOwner === true && interaction.member.id !== 'OWNER ID') {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `Only the bot developer can use this command`, ephemeral: true })
        }
        
        if (cmd.serverOwner === true && interaction.member.id !== interaction.guild.ownerId) {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `Only the server owner can use this command`, ephemeral: true })
        }
        
        if (!interaction.guild.me.permissions.has(cmd.botChannelPerms || [])) {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `I need the **\`${cmd.botChannelPerms}\`** in this channel to use this command!`, ephemeral: true })
        }
        
        cmd.run(client, interaction, args).catch(() => {});
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
   } catch (e) {
   console.log(e)
   }
});
