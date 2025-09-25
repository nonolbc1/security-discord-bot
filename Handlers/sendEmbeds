const { EmbedBuilder } = require("discord.js");

async function sendEmbed({ title, description, channelId, color, client }) {
    if (!client) throw new Error("⚠️ Aucun client passé à sendEmbed !");
    if (!channelId) throw new Error("⚠️ Aucun channelId passé à sendEmbed !");

    const channel = await client.channels.fetch(channelId).catch(() => null);
    if (!channel) throw new Error(`⚠️ Salon introuvable (ID: ${channelId})`);

    const embed = new EmbedBuilder()
        .setTitle(title || "📌 Pas de titre")
        .setDescription(description || "Pas de description.")
        .setColor(color || "#ff0000")
        .setTimestamp();

    await channel.send({ embeds: [embed] });
}

module.exports = sendEmbed;