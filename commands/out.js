function registerOutCommand(bot) {
    bot.command('out', async (ctx) => {
        if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
            return ctx.reply("Cette commande est uniquement utilisable dans les groupes.");
        }

        const chatMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
        if (chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
            return ctx.reply("Seuls les administrateurs peuvent utiliser cette commande.");
        }

        try {
            await ctx.leaveChat();
            console.log(`Le bot a quitté le groupe : ${ctx.chat.title}`);
        } catch (error) {
            ctx.reply("Erreur lors de la tentative de quitter le groupe.");
        }
    });
}

module.exports = registerOutCommand;
