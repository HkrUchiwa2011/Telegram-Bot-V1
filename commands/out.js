const { Telegraf } = require('telegraf');
const bot = new Telegraf('8097762189:AAEra_qZVKfnFE_aOhFSnd8fX2efgxFty3M');

const ADMIN_ID = '7027291897';

bot.command('out', async (ctx) => {
    if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
        return ctx.reply("Cette commande est uniquement pour les groupes.");
    }

    if (ctx.from.id.toString() !== ADMIN_ID) {
        return ctx.reply("Seul l'administrateur du bot peut utiliser cette commande.");
    }

    try {
        await ctx.leaveChat();
        console.log(`Le bot a quitté le groupe : ${ctx.chat.title}`);
    } catch (error) {
        ctx.reply("Erreur lors de la sortie du groupe.");
    }
});

module.exports = bot;
