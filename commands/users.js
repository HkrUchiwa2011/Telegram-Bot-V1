const botAdmins = [7027291897, 6903739769]; // Liste des administrateurs du bot
let allUsers = []; // Liste des utilisateurs ayant interagi avec le bot

module.exports = (bot) => {
  // Middleware pour enregistrer tous les utilisateurs
  bot.use(async (ctx, next) => {
    if (ctx.from) {
      const user = {
        id: ctx.from.id,
        first_name: ctx.from.first_name,
        username: ctx.from.username || "Pas de pseudo",
      };

      // Ajouter l'utilisateur s'il n'existe pas déjà
      if (!allUsers.some((u) => u.id === user.id)) {
        allUsers.push(user);
      }
    }
    await next();
  });

  bot.command('users', async (ctx) => {
    try {
      if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
        // Liste des membres du groupe
        const members = await ctx.getChatAdministrators();
        const memberList = members.map((member) => {
          const username = member.user.username || "Pas de pseudo";
          return `👤 ${member.user.first_name} (${username})`;
        });

        ctx.reply(`📋 Liste des membres du groupe :\n\n${memberList.join('\n')}`);
      } else if (ctx.chat.type === 'private') {
        // Vérification des droits d'admin
        if (!botAdmins.includes(ctx.from.id)) {
          return ctx.reply("🚫 Seuls les administrateurs du bot peuvent utiliser cette commande en privé.");
        }

        // Liste des utilisateurs ayant interagi avec le bot
        const userList = allUsers.map((user) => {
          return `👤 ${user.first_name} (${user.username})`;
        });

        ctx.reply(`📋 Liste de tous les utilisateurs ayant interagi avec le bot :\n\n${userList.join('\n')}`);
      }
    } catch (error) {
      console.error("Erreur dans la commande /users :", error.message);
      ctx.reply("❌ Une erreur s'est produite. Essayez à nouveau.");
    }
  });
};
