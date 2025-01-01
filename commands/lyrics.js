const axios = require('axios');

module.exports = (bot) => {
  bot.command('lyrics', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');

    if (!query) {
      return ctx.reply('Veuillez fournir une chanson ou un artiste, comme : /lyrics Tiakola Meuda');
    }

    try {
      const { data } = await axios.get(`https://api.lyrics.ovh/v1/${query.split(' ')[0]}/${query.split(' ').slice(1).join(' ')}`);

      if (data && data.lyrics) {
        ctx.reply(`🎵 Paroles pour "${query}" :\n\n${data.lyrics}`);
      } else {
        ctx.reply('❌ Aucune parole trouvée pour cette recherche.');
      }
    } catch (error) {
      console.error('Erreur dans la commande /lyrics :', error.message);
      ctx.reply('❌ Une erreur s\'est produite. Vérifiez l\'orthographe et réessayez.');
    }
  });
};
