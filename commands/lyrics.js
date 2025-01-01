const axios = require('axios');

function registerLyricsCommand(bot) {
    bot.command('lyrics', async (ctx) => {
        const input = ctx.message.text.split(' ').slice(1).join(' ');
        if (!input) {
            return ctx.reply("Veuillez fournir le titre de la chanson et l'artiste. Exemple : /lyrics Tiakola Meuda");
        }

        const apiKey = 'Bearer 84mtCiaqMb_YmStKqbe5zXbgp1RK7jnnxkITlsLcKJ6K0JkTSxiYv7hP1lGjqGCkzwNfg3Z37LC9tTYtFHiuKQ';
        const url = `https://api.genius.com/search`;

        try {
            // Effectuer une recherche de paroles
            const response = await axios.get(url, {
                params: { q: input },
                headers: { Authorization: apiKey }
            });

            if (response.data.response.hits.length > 0) {
                const firstResult = response.data.response.hits[0].result;
                const title = firstResult.full_title;
                const urlLyrics = firstResult.url;

                ctx.reply(`Voici la chanson trouvée :\n\n**${title}**\n🔗 [Lien vers les paroles](${urlLyrics})`, {
                    parse_mode: 'Markdown'
                });
            } else {
                ctx.reply("Paroles introuvables. Vérifiez le titre ou l'artiste.");
            }
        } catch (error) {
            console.error("Erreur API Genius :", error.response?.data || error.message);

            if (error.response?.status === 401) {
                ctx.reply("Erreur : La clé API est invalide ou a expiré.");
            } else {
                ctx.reply("Erreur lors de la récupération des paroles. Réessayez plus tard.");
            }
        }
    });
}

module.exports = registerLyricsCommand;
