module.exports = async (bot, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "❌ Erreur dans la commande !", ephemeral: true });
    }
}