const { SlashCommandBuilder } = require("discord.js");

const sendEmbeds = require("../Handlers/sendEmbeds.js");
const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout un utilisateur pendant un certain temps.")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("L'utilisateur a sanctionné.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Le motif/La raison de la sanction.")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("time")
                .setDescription("La durée de la sanction en heures. (Défaut: 672)")
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option.setName("public")
                .setDescription("Si public, la sanction sera affiché dans le salon d'avertissement public. (Défaut: true)")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const time = interaction.options.getInteger("time") ?? 672;
        const isPublic = interaction.options.getBoolean("public") ?? true;

        const channel_public = config.channels.public;
        const channel_private = config.channels.private;

        const embed = {};

        if (time == 0) {
            embed.title = "Annulation Timeout";
            embed.author = interaction.user.tag;
            embed.description = `${reason} | Auteur: ${embed.author}`
            embed.color = "#13E300";
        } else {
            embed.title = "Timeout";
            embed.author = interaction.user.tag;
            embed.description = `${reason} | Pendant ${time} heure(s) | Auteur: ${embed.author}`;
            embed.color = "#E39400";
        }

        const owner = config.roles.owner;
        const coowner = config.roles.coowner;

        const member = await interaction.guild.members.fetch(user.id);
        
        if (member.roles.cache.hasAny(owner, coowner)) {
            await interaction.reply("❌ Impossible de timeout cet utilisateur. (Rôles intouchables)");
            return;
        }

        try {
            if (isPublic) {
                await sendEmbeds({
                    title: embed.title,
                    description: embed.description,
                    channelId: channel_public,
                    color: embed.color,
                    client: interaction.client
                });
            };
            
            await sendEmbeds({
                title: embed.title,
                description: embed.description,
                channelId: channel_private,
                color: embed.color,
                client: interaction.client
            });
            
            if (time == 0) {
                await member.timeout(null, reason);
                await interaction.reply(`✅ Le timeout de ${user.tag} a été annulé.`);
            } else {
                await member.timeout(time * 3600000, reason);
                await interaction.reply(`✅ ${user.tag} a été timeout pendant ${time} heure(s).`);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply("❌ Impossible de timeout cet utilisateur.");
        };
    }
};