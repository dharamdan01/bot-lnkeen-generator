const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
const nanoId = require('nanoid');
const URL = require('../models/url');
const PORT = process.env.PORT || 5001;
const pingCommand = require('./commands/ping');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
    if(msg.content == 'hello'){
        msg.reply('Hello there! How can I assist you today?');
    }

    if(msg.content.startsWith('create') || msg.content.startsWith('Create')){
        let url = msg.content;
        url = url.replaceAll(' ', '');
        url = url.toLowerCase().replaceAll('create', '');
        if(url && (url.startsWith('http://') || url.startsWith('https://')))
        {
        // const shortId = shortid.generate(); // deprecated
        try{
            const shortId = nanoId.nanoid(10);
                await URL.create({
                    shortId: shortId,
                    redirectURL: url,
                    visitHistory: [],
                });
            if(PORT == 5001)
            {
                msg.reply(`Short URL created: http://localhost:${PORT}/url/${shortId}`);
            }
            else{
                msg.reply(`Short URL created: https://bot-lnkeen-generator-production.up.railway.app/url/${shortId}`);
            }
        }
        catch(err){
            console.log('Error creating short URL:', err.message);
            msg.reply("Sorry, I couldn't save the URL right now. Please try again later.");
        }
        }
        else {
            msg.reply('Please provide a URL to shorten(e.g., create https://example.com)');
            return;
    }
}
});

client.on('error', error => console.log('An error occurred of the discord bot:', error));

client.on('interactionCreate', async interaction => {
    // console.log('Interaction received:', interaction);
    if(!interaction.isCommand()) return;
    console.log('Command received:', interaction.commandName);
    if(interaction.commandName == 'ping')
    {
        const description = pingCommand[0].description;
        await interaction.reply(description);
    }
})

module.exports = client;