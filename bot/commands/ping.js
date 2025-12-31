const {REST, Routes} = require('discord.js');
const pingCommand = [{
    name: 'ping',
    description: 'Replies with Pong!'
}];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_BOT_TOKEN);
 
(async () => {
    try{
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID), {body: pingCommand});
        console.log('Successfully reloaded application (/) commands.');
    }
    catch(err){
        console.log('Error registering commands:', err);
    }
})();

module.exports = pingCommand;