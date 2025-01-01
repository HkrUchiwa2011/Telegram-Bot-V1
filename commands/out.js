module.exports = (bot) => {
  bot.command('out', async (ctx) => {
    try {
      const admins = await ctx.getChatAdministrators();
      const isAdmin = admins.some((admin) => admin.user.id === ctx.from.id);

      if (!isAdmin) {
        return ctx.reply("🚫 Seuls les administrateurs du groupe peuvent demander au bot de sortir.");
      }

      await ctx.leaveChat();
      ctx.reply("👋 Le bot a quitté le groupe.");
    } catch (error) {
      console.error('Erreur dans la commande /out :', error.message);
      ctx.reply('❌ Une erreur est survenue.');
    }
  });
};
