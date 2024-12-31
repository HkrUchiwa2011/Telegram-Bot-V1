const axios = require('axios');

function registerLyricsCommand(bot) {
    bot.command('lyrics', async (ctx) => {
        const input = ctx.message.text.split(' ').slice(1).join(' ');
        if (!input) {
            return ctx.reply("Veuillez fournir le titre de la chanson et l'artiste. Exemple : /lyrics Tiakola Meuda");
        }

        try {
            const response = await axios.get(`https://api.lyrics.ovh/v1/${input}`, {
                headers: {
                    'Authorization': `Bearer 2e234eb58c504ec6930f14137897abcc`
                }
            });

            if (response.data && response.data.lyrics) {
                ctx.reply(`Paroles de "${input}" :\n\n${response.data.lyrics}`);
            } else {
                ctx.reply("Paroles introuvables. Vérifiez le titre ou l'artiste.");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des paroles :", error.message);
            ctx.reply("Erreur lors de la récupération des paroles. Réessayez plus tard.");
        }
    });
}

module.exports = registerLyricsCommand;
