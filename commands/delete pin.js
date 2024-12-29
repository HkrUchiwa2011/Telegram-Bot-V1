const axios = require('axios');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../config.dev.json');
let config = require(configPath);

const pinterestApiKey = '8OT6eec1CifuEsTug-n4LIfSwyuuM47vKVxm76zxU9c';

module.exports = (bot) => {
    // Commande pour rechercher des pins
    bot.command('searchpin', async (ctx) => {
        const args = ctx.message.text.split(' ').slice(1).join(' ');

        if (!args) {
            return ctx.reply('⚠️ Veuillez fournir un mot-clé pour rechercher des pins.');
        }

        try {
            const response = await axios.get(`https://api.pinterest.com/v1/pins/search/`, {
                params: {
                    query: args,
                    access_token: pinterestApiKey,
                },
            });

            const pins = response.data?.data || [];

            if (pins.length === 0) {
                return ctx.reply('❌ Aucun résultat trouvé pour votre recherche.');
            }

            let message = `🔎 **Résultats pour "${args}"**:\n\n`;
            for (const pin of pins.slice(0, 5)) { // Limiter les résultats à 5
                message += `- **Titre**: ${pin.note || 'Aucun titre'}\n`;
                message += `  🌐 [Voir le pin](${pin.link || 'Lien indisponible'})\n\n`;
            }

            ctx.replyWithMarkdown(message);
        } catch (error) {
            console.error('Erreur lors de la recherche de pins :', error.message);
            ctx.reply('❌ Une erreur est survenue lors de la recherche.');
        }
    });

    // Commande pour enregistrer un pin
    bot.command('savepin', async (ctx) => {
        if (ctx.from.id != config.admin_id) {
            return ctx.reply('❌ Seul l\'administrateur principal peut enregistrer des pins.');
        }

        const args = ctx.message.text.split(' ').slice(1);
        if (args.length < 2) {
            return ctx.reply('⚠️ Veuillez fournir l\'ID du pin et un nom pour le tableau.');
        }

        const pinId = args[0];
        const boardName = args.slice(1).join(' ');

        try {
            const response = await axios.post(`https://api.pinterest.com/v1/pins/`, {
                pin: pinId,
                board: boardName,
            }, {
                headers: {
                    Authorization: `Bearer ${pinterestApiKey}`,
                },
            });

            if (response.status === 201) {
                ctx.reply(`✅ Le pin ${pinId} a été enregistré dans le tableau "${boardName}".`);
            } else {
                ctx.reply('❌ Impossible d\'enregistrer le pin. Veuillez vérifier les informations fournies.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du pin :', error.message);
            ctx.reply('❌ Une erreur est survenue lors de l\'enregistrement du pin.');
        }
    });

    // Commande pour afficher les pins enregistrés
    bot.command('mypins', async (ctx) => {
        try {
            const response = await axios.get(`https://api.pinterest.com/v1/me/pins/`, {
                headers: {
                    Authorization: `Bearer ${pinterestApiKey}`,
                },
            });

            const pins = response.data?.data || [];

            if (pins.length === 0) {
                return ctx.reply('❌ Vous n\'avez pas encore de pins enregistrés.');
            }

            let message = `📌 **Vos pins enregistrés**:\n\n`;
            for (const pin of pins.slice(0, 5)) { // Limiter à 5 résultats
                message += `- **Titre**: ${pin.note || 'Aucun titre'}\n`;
                message += `  🌐 [Voir le pin](${pin.link || 'Lien indisponible'})\n\n`;
            }

            ctx.replyWithMarkdown(message);
        } catch (error) {
            console.error('Erreur lors de la récupération des pins :', error.message);
            ctx.reply('❌ Une erreur est survenue lors de la récupération des pins.');
        }
    });
};
