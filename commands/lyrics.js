const { Telegraf } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('8097762189:AAEra_qZVKfnFE_aOhFSnd8fX2efgxFty3M');

bot.command('lyrics', async (ctx) => {
    const input = ctx.message.text.split(' ').slice(1).join(' ');

    if (!input) {
        return ctx.reply("Veuillez fournir le titre de la chanson et/ou l'artiste. Exemple : /lyrics Tiakola Meuda");
    }

    const apiKey = "c88b9be90ffcdd74976efe753db468f1";
    const url = `https://api.lyrics.ovh/v1/${input}`;

    try {
        const response = await axios.get(url);
        if (response.data.lyrics) {
            ctx.reply(`Voici les paroles :\n\n${response.data.lyrics}`);
        } else {
            ctx.reply("Paroles introuvables. Assurez-vous que le titre ou l'artiste est correct.");
        }
    } catch (error) {
        ctx.reply("Erreur lors de la recherche des paroles. Veuillez réessayer.");
    }
});

module.exports = bot;
