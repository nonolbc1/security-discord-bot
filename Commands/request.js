const { SlashCommandBuilder } = require("discord.js");

const sendEmbeds = require("../Handlers/sendEmbeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("request")
        .setDescription("Demander une bannissement, expulsion, ou autre chose en vers un utilisateur à un Owner/Co Owner.")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("L'utilisateur ciblé.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Le motif/La raison de la demande.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("request")
                .setDescription("Request sert à spécifié l'action contre un utilisateur. (Exemple: Ban)")
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const request = interaction.options.getString("request");

        const title = "Request";
        const author = interaction.user.tag;
        const description = `${reason} | Requête de \"${request}\" | Demandé par: ${author}`;
        const channel = "1420132724500332544";
        const color = "#3100E3";

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            await interaction.reply("❌ Impossible de trouver ce membre sur le serveur.");
            return;
        }

        try {
            await sendEmbeds({
                title,
                description,
                channelId: channel,
                color,
                client: interaction.client
            });

            await interaction.reply(`✅ Demande de \"${request}\" contre ${user} envoyé avec succès !`);
        } catch (error) {
            console.error(error);
            await interaction.reply("❌ Erreur.");
        }
    }
};