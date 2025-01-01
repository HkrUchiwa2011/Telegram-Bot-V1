const axios = require('axios');

module.exports = (bot) => {
  bot.command('lyrics', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');

    if (!query) {
      return ctx.reply('❌ Veuillez fournir une chanson ou un artiste, comme : /lyrics Tiakola Meuda');
    }

    try {
      const { data } = await axios.get('https://duckduckgo.com/', {
        params: {
          q: `${query} lyrics`,
          format: 'json',
          no_redirect: 1,
        },
      });

      if (data) {
        const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query + " lyrics")}`;
        ctx.reply(`🎵 Résultats pour "${query}" :\n\n🔗 [Cliquez ici pour voir les paroles](${searchUrl})`, { parse_mode: 'Markdown' });
      } else {
        ctx.reply('❌ Aucune information trouvée pour cette recherche.');
      }
    } catch (error) {
      console.error('Erreur dans la commande /lyrics :', error.message);
      ctx.reply('❌ Une erreur est survenue. Réessayez plus tard.');
    }
  });
};
