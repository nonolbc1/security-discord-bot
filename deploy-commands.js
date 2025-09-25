require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const config = require("./config");

module.exports = async function deployCommands() {
    const commands = [];
    const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./Commands/${file}`);
        console.log(`[0x01] Commande \"${command}\" trouvé.`)
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    const clientId = config.clientId;
    const guildId = config.guildId;
    
    if (!clientId || !guildId) {
        console.log("[0x01] ⚠️ CLIENT_ID et GUILD_ID sont requis pour déployer les commandes slash.");
        console.log("[0x01] Veuillez définir CLIENT_ID et GUILD_ID dans votre fichier .env");
        return;
    }

    (async () => {
        try {
            console.log("[0x01] Déploiement des slash commands en cours...")
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log("[0x01] Slash commands envoyées avec succès !");
        } catch (error) {
            console.error("[0x01] Erreur pendant le déploiement :", error);
        }
    })();
};