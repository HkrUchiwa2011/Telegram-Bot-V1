const axios = require('axios');

module.exports = (bot) => {
  bot.command('video', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');

    if (!query) {
      return ctx.reply('Veuillez fournir une recherche, comme : /video Naruto épisode 5');
    }

    try {
      const { data } = await axios.get('https://api.duckduckgo.com/', {
        params: {
          q: query,
          format: 'json',
          no_html: 1,
          t: 'telegram_bot',
        },
      });

      if (data.RelatedTopics && data.RelatedTopics.length > 0) {
        const results = data.RelatedTopics.slice(0, 3); // Limite à 3 résultats
        results.forEach((topic) => {
          if (topic.FirstURL && topic.Text) {
            ctx.reply(`🎥 [${topic.Text}](${topic.FirstURL})`, { parse_mode: 'Markdown' });
          }
        });
      } else {
        ctx.reply('❌ Aucune vidéo trouvée pour cette recherche.');
      }
    } catch (error) {
      console.error('Erreur dans la commande /video :', error.message);
      ctx.reply('❌ Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  });
};
