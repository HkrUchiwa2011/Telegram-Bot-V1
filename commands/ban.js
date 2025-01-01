function registerBanCommand(bot) {
    bot.command('ban', async (ctx) => {
        if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
            return ctx.reply("Cette commande est utilisable uniquement dans les groupes.");
        }

        const chatMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);

        if (!['creator', 'administrator'].includes(chatMember.status)) {
            return ctx.reply("Seuls les administrateurs peuvent utiliser cette commande.");
        }

        const botMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.botInfo.id);

        if (botMember.status !== 'administrator') {
            return ctx.reply("Je dois être administrateur dans ce groupe pour pouvoir bannir un utilisateur.");
        }

        const input = ctx.message.text.split(' ').slice(1).join(' ');
        if (!input) {
            return ctx.reply("Veuillez mentionner l'utilisateur à bannir. Exemple : /ban @username");
        }

        const targetUser = ctx.message.reply_to_message
            ? ctx.message.reply_to_message.from
            : input.startsWith('@')
            ? input.slice(1)
            : input;

        try {
            const userId = isNaN(targetUser) ? (await ctx.telegram.getUser(targetUser)).id : targetUser;

            await ctx.telegram.kickChatMember(ctx.chat.id, userId);
            ctx.reply("L'utilisateur a été banni avec succès.");
        } catch (error) {
            console.error("Erreur lors du bannissement :", error.message);
            ctx.reply("Erreur lors du bannissement. Vérifiez que l'utilisateur est valide.");
        }
    });
}

module.exports = registerBanCommand;
