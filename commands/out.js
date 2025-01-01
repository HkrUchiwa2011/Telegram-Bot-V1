module.exports = (bot) => {
  bot.command('out', async (ctx) => {
    try {
      // Vérifier si l'utilisateur est un admin dans le groupe
      if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
        const admins = await ctx.getChatAdministrators();
        const isAdmin = admins.some((admin) => admin.user.id === ctx.from.id);

        if (!isAdmin) {
          return ctx.reply("🚫 Seuls les administrateurs du groupe peuvent demander au bot de sortir.");
        }

        // Quitter le groupe
        await ctx.leaveChat();
        ctx.reply("👋 Le bot a quitté le groupe.");
      } else {
        ctx.reply("Cette commande est uniquement disponible dans les groupes.");
      }
    } catch (error) {
      console.error("Erreur dans la commande /out :", error.message);
      ctx.reply("❌ Une erreur est survenue. Le bot n'a pas pu quitter le groupe.");
    }
  });
};
