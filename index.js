require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const config = require("./config");
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");
const deployCommands = require("./deploy-commands");

bot.commands = new Collection();

(async () => {
    await deployCommands();
    loadCommands(bot);
    await loadEvents(bot);

    await bot.login(process.env.TOKEN);
})();

/*
0x01 = DEPLOY COMMANDS
0x02 = LOADING COMMANDS
0x03 = LOADING EVENTS
*/