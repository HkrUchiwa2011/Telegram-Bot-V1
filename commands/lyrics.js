const axios = require('axios');
const cheerio = require('cheerio');

module.exports = (bot) => {
  bot.command('lyrics', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');

    if (!query) {
      return ctx.reply('❌ Veuillez fournir un titre ou un artiste, comme : /lyrics Tiakola Meuda');
    }

    try {
      // Rechercher les paroles en ligne
      const searchUrl = `https://genius.com/search?q=${encodeURIComponent(query)}`;
      const { data: searchPage } = await axios.get(searchUrl);
      const $ = cheerio.load(searchPage);

      // Récupérer le premier lien vers les paroles
      const lyricsUrl = $('.mini_card-title').first().parent().attr('href');

      if (!lyricsUrl) {
        return ctx.reply('❌ Aucune parole trouvée pour cette recherche.');
      }

      // Récupérer les paroles à partir du lien trouvé
      const { data: lyricsPage } = await axios.get(lyricsUrl);
      const $$ = cheerio.load(lyricsPage);
      const lyrics = $$('.Lyrics__Container-sc-1ynbvzw-6').text().trim();

      if (!lyrics) {
        return ctx.reply('❌ Impossible de récupérer les paroles.');
      }

      return ctx.reply(`🎵 Paroles de "${query}" :\n\n${lyrics.slice(0, 4096)}`);
    } catch (error) {
      console.error('Erreur dans la commande /lyrics :', error.message);
      ctx.reply('❌ Une erreur est survenue. Réessayez plus tard.');
    }
  });
};
