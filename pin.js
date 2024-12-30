const axios = require('axios');

module.exports = (bot) => {
  bot.command('pin', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');

    if (!query) {
      return ctx.reply('Veuillez fournir un sujet pour la recherche, comme : /pin Apple');
    }

    try {
      // Requête à l'API SerpAPI avec votre clé API
      const { data } = await axios.get(`https://serpapi.com/search.json`, {
        params: {
          q: query,
          engine: 'google_images',
          ijn: 0,
          api_key: '62c573875659a85794330e1e80d88a42c60d91034425798d26e43f9ee9b629c9'
        }
      });

      if (data.images_results && data.images_results.length > 0) {
        const imageUrl = data.images_results[0].original || data.images_results[0].thumbnail;
        return ctx.replyWithPhoto(imageUrl, { caption: `Résultat pour "${query}"` });
      }

      ctx.reply('Aucune image trouvée pour cette recherche.');
    } catch (error) {
      ctx.reply('Une erreur est survenue lors de la recherche d\'images. Veuillez réessayer plus tard.');
      console.error('Erreur lors de la recherche d\'images :', error.message);
    }
  });
};
