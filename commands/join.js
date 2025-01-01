const botAdmins = [7027291897, 6903739769];

module.exports = (bot) => {
  bot.on('new_chat_members', async (ctx) => {
    const newMember = ctx.message.new_chat_members.find((member) => member.id === ctx.botInfo.id);

    if (newMember) {
      botAdmins.forEach((adminId) => {
        bot.telegram.sendMessage(
          adminId,
          `🤖 Le bot a été ajouté dans le groupe "${ctx.chat.title}" par ${ctx.from.first_name}.`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: 'Rejoindre le groupe', url: `https://t.me/${ctx.chat.username || ''}` }],
              ],
            },
          }
        );
      });
    }
  });

  bot.command('join', async (ctx) => {
    if (!botAdmins.includes(ctx.from.id)) {
      return ctx.reply("🚫 Seuls les administrateurs du bot peuvent utiliser cette commande.");
    }

    if (!ctx.message.reply_to_message) {
      return ctx.reply("❌ Vous devez répondre au message de notification pour rejoindre un groupe.");
    }

    const link = ctx.message.reply_to_message.reply_markup.inline_keyboard[0][0].url;
    ctx.reply(`🔗 Lien pour rejoindre : ${link}`);
  });
};
