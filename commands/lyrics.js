const axios = require('axios');

function registerLyricsCommand(bot) {
    bot.command('lyrics', async (ctx) => {
        const input = ctx.message.text.split(' ').slice(1).join(' ');
        if (!input) {
            return ctx.reply("Veuillez fournir le titre de la chanson et l'artiste. Exemple : /lyrics Tiakola Meuda");
        }

        // Supposons que l'utilisateur entre "Artiste - Titre"
        const [artist, title] = input.split(' - ').map(str => str.trim());

        if (!artist || !title) {
            return ctx.reply("Format incorrect. Veuillez utiliser le format : Artiste - Titre");
        }

        const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;

        try {
            const response = await axios.get(url);
            if (response.data && response.data.lyrics) {
                ctx.reply(`Paroles de "${title}" par ${artist} :\n\n${response.data.lyrics}`);
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
