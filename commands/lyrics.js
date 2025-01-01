const axios = require('axios');

function registerLyricsCommand(bot) {
    bot.command('lyrics', async (ctx) => {
        const input = ctx.message.text.split(' ').slice(1).join(' ');
        if (!input) {
            return ctx.reply("Veuillez fournir le titre de la chanson et l'artiste. Exemple : /lyrics Tiakola Meuda");
        }

        const apiKey = '84mtCiaqMb_YmStKqbe5zXbgp1RK7jnnxkITlsLcKJ6K0JkTSxiYv7hP1lGjqGCkzwNfg3Z37LC9tTYtFHiuKQ';
        const url = `https://api.yourlyricsapi.com/v1/lyrics`; // Remplace avec l'URL correcte de l'API

        try {
            const response = await axios.get(url, {
                params: { q: input },
                headers: { Authorization: `Bearer ${apiKey}` }
            });

            if (response.data && response.data.lyrics) {
                ctx.reply(`Paroles de "${input}" :\n\n${response.data.lyrics}`);
            } else {
                ctx.reply("Paroles introuvables. Vérifiez le titre ou l'artiste.");
            }
        } catch (error) {
            console.error("Erreur API :", error.message);
            ctx.reply("Erreur lors de la récupération des paroles. Réessayez plus tard.");
        }
    });
}

module.exports = registerLyricsCommand;
