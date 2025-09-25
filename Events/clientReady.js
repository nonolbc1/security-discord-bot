const { ActivityType } = require("discord.js");

module.exports = async bot => {
    console.log(`✅ Connecté en tant que ${bot.user.tag}`);

    bot.user.setPresence({
        activities: [{ name: "Surveiller le serveur 🔒", type: ActivityType.Custom }],
        status: "online"
    });
}