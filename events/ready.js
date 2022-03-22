const client = require("../index");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('STATUS HERE', { type: 'PLAYING' });
});
