function registerOutCommand(bot) {
    bot.command('out', async (ctx) => {
        if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
            return ctx.reply("Cette commande est uniquement utilisable dans les groupes.");
        }

        try {
            const chatMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);

            if (['administrator', 'creator'].includes(chatMember.status)) {
                await ctx.leaveChat();
                console.log(`Le bot a quitté le groupe : ${ctx.chat.title}`);
            } else {
                ctx.reply("Seuls les administrateurs peuvent utiliser cette commande.");
            }
        } catch (error) {
            console.error("Erreur lors de la tentative de quitter le groupe :", error.message);
            ctx.reply("Erreur lors de la tentative de quitter le groupe.");
        }
    });
}

module.exports = registerOutCommand;
