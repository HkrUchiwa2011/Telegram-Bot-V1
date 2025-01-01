const botAdmins = [7027291897, 6903739769];

module.exports = (bot) => {
  bot.command('adminlist', (ctx) => {
    const adminList = botAdmins.map((id) => `👤 Admin ID : ${id}`).join('\n');
    ctx.reply(`📋 Liste des administrateurs du bot :\n\n${adminList}`);
  });
};
