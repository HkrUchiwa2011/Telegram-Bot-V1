const axios = require('axios');

module.exports = (bot) => {
  bot.command('video', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');

    if (!query) {
      return ctx.reply('Veuillez fournir une recherche, comme : /video Naruto épisode 5');
    }

    try {
      const { data } = await axios.get('https://api.example.com/videos', {
        params: {
          search: query,
          limit: 3, // Nombre de résultats
          apikey: '84mtCiaqMb_YmStKqbe5zXbgp1RK7jnnxkITlsLcKJ6K0JkTSxiYv7hP1lGjqGCkzwNfg3Z37LC9tTYtFHiuKQ',
        },
      });

      if (data.results && data.results.length > 0) {
        data.results.forEach((video) => {
          ctx.reply(`🎥 [${video.title}](${video.url})`, { parse_mode: 'Markdown' });
        });
      } else {
        ctx.reply('❌ Aucune vidéo trouvée pour cette recherche.');
      }
    } catch (error) {
      console.error('Erreur dans la commande /video :', error.message);
      ctx.reply('❌ Une erreur est survenue.');
    }
  });
};
