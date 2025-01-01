const axios = require('axios');

module.exports = (bot) => {
  bot.command('video', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');

    if (!query) {
      return ctx.reply('❌ Veuillez fournir un titre, comme : /video Naruto épisode 5');
    }

    try {
      // Rechercher des vidéos sur Dailymotion
      const searchUrl = `https://api.dailymotion.com/videos?search=${encodeURIComponent(query)}&limit=1`;
      const { data } = await axios.get(searchUrl);

      if (!data.list || data.list.length === 0) {
        return ctx.reply('❌ Aucune vidéo trouvée pour cette recherche.');
      }

      const video = data.list[0];
      const videoUrl = `https://www.dailymotion.com/video/${video.id}`;

      // Envoyer la vidéo directement
      return ctx.replyWithVideo(videoUrl, { caption: `🎥 Résultat pour "${query}"` });
    } catch (error) {
      console.error('Erreur dans la commande /video :', error.message);
      ctx.reply('❌ Une erreur est survenue. Réessayez plus tard.');
    }
  });
};
