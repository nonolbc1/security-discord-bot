const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const sendEmbeds = require("../Handlers/sendEmbeds");
const bot = require("../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bannir un utilisateur du serveur.")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("L'utilisateur à bannir.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Le motif/La raison du bannissement.")
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName("public")
                .setDescription("Si public, la sanction sera affichée dans le salon public. (Défaut: true)")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const isPublic = interaction.options.getBoolean("public") ?? true;

        const title = "Ban";
        const author = interaction.user.tag;
        const description = `${reason} | Auteur: ${author}`;
        const channel_public = "1420130911139266710";
        const channel_private = "1420427666103865400";
        const color = "#E30000";

        const owner = "1420114830366347355";
        const coowner = "1420115040429674658";

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            await interaction.reply("❌ Impossible de trouver ce membre sur le serveur.");
            return;
        }

        if (member.roles.cache.hasAny(owner, coowner)) {
            await interaction.reply("❌ Impossible de bannir cet utilisateur. (Rôles intouchables)");
            return;
        }

        try {
            if (isPublic) {
                await sendEmbeds({
                    title,
                    description,
                    channelId: channel_public,
                    color,
                    client: interaction.client
                });
            }
            
            await sendEmbeds({
                title,
                description,
                channelId: channel_private,
                color,
                client: interaction.client
            });

            await member.ban({ reason: `${reason} — par ${author}` });

            await interaction.reply(`✅ ${user.tag} a été banni avec succès.`);
        } catch (error) {
            console.error(error);
            await interaction.reply("❌ Impossible de bannir cet utilisateur.");
        }
    }
};