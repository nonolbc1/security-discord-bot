module.exports = {
    // Discord bot configuration
    clientId: process.env.CLIENT_ID || "",
    guildId: process.env.GUILD_ID || "",
    
    // Channel IDs
    channels: {
        public: process.env.PUBLIC_CHANNEL_ID || "",
        private: process.env.PRIVATE_CHANNEL_ID || "",
        request: process.env.REQUEST_CHANNEL_ID || ""
    },
    
    // Role IDs 
    roles: {
        owner: process.env.OWNER_ROLE_ID || "",
        coowner: process.env.COOWNER_ROLE_ID || ""
    }
};