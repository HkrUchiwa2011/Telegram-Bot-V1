module.exports = (bot) => {
  bot.command('start', (ctx) => {
    const userName = ctx.from.first_name; 

    const welcomeMessage = `👋 Bonjour ${userName} \n\n Bienvenue à vous,créature supérieure. Moi c'est FadilSasuChatbot \n\n- Tappez /help pour consulter la liste de mes commandes \n\n Veuillez s'il vous plaît laisser un message à @fadil_uchiwa si le bot recontre des problèmes 😇`;

    ctx.reply(welcomeMessage);
  });
};
