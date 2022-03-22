const client = require("../index");

client.on("messageCreate", async (message) => {
    try {
    if (message.author.bot || !message.guild || !message.guild.me.permissions.has('SEND_MESSAGES') || !message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES')) return;
    
    // Mention Prefix
    let pref2;
    let mentionRegex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, "gi"));
    if (mentionRegex) {
      pref2 = `${mentionRegex[0]} `
    } else {
      pref2 = pref
    }

    if (!message.content.toLowerCase().startsWith(pref2)) return;
    const args = message.content.slice(pref2.length).trim().split(/ +/);
    const cmd = args.shift();

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    
    // Command User Permissions Check
    if (!message.member.permissions.has(command.memberPermissions || [])) return message.channel.send({ content: `I need **\`${command.memberPermissions}\`** to use this command!` });
    
    // Bot Developer Permissions Commands
    if (command.owner === true && message.author.id !== 'OWNER ID') return message.channel.send('This command is for the bot owner only!'); //replace 'OWNER ID' with the bot owner's ID
    
    // Bot Channel Permissions Check   
    if (!message.guild.me.permissionsIn(message.channel).has(command.botChannelPerms || [])) return message.channel.send({ content: `I need **\`${command.botChannelPerms}\`** to use this command.` });
    
    // Bot Server Permissions Check
    if (!message.guild.me.permissions.has(command.botPerms || [])) return message.channel.send({ content: `I need **\`${command.botPerms}\`** to use this command.` });
    
    // Server Owner Permissions Check
    if(command.serverOwner === true && message.author.id !== message.guild.ownerId) return message.channel.send({ content: `This command is only accessible by the server owner.` });
    
    if (!command) return;
    
    await command.run(client, message, args).catch(async (error) => {
      // Error handler
      console.log(error);
    });

    module.exports = command
    } catch (e) {
    console.log(e)
    }
});
