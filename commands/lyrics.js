const axios = require('axios');

function registerLyricsCommand(bot) {
    bot.command('lyrics', async (ctx) => {
        const input = ctx.message.text.split(' ').slice(1).join(' ');
        if (!input) {
            return ctx.reply("Veuillez fournir le titre de la chanson. Exemple : /lyrics Tiakola Meuda");
        }

        try {
            const response = await axios.get(`https://api.lyrics.ovh/v1/${input}`);
            if (response.data.lyrics) {
                ctx.reply(`Voici les paroles :\n\n${response.data.lyrics}`);
            } else {
                ctx.reply("Paroles introuvables. Assurez-vous que le titre est correct.");
            }
        } catch (error) {
            ctx.reply("Erreur lors de la récupération des paroles.");
        }
    });
}

module.exports = registerLyricsCommand;
