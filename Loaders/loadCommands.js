const fs = require("fs");

module.exports = (bot) => {
    bot.commands = new Map();

    fs.readdirSync("./Commands")
      .filter(f => f.endsWith(".js"))
      .forEach(file => {
        const command = require(`../Commands/${file}`);

        if (!command.data || !command.execute) {
            throw new Error(`La commande ${file} est invalide (pas de data ou execute)`);
        }

        bot.commands.set(command.data.name, command);
        console.log(`[0x02] Slash command ${file} chargée avec succès !`);
    });
};
