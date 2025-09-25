require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");

module.exports = async function deployCommands() {
    const commands = [];
    const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./Commands/${file}`);
        console.log(`[0x01] Commande \"${command}\" trouvé.`)
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    const clientId = "1420392511545016392"; 
    const guildId = "1420029191134646384";

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
