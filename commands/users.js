const fs = require('fs');
const { Telegraf } = require('telegraf');
const bot = new Telegraf('8097762189:AAEra_qZVKfnFE_aOhFSnd8fX2efgxFty3M');

// Chargement ou initialisation des utilisateurs
const usersFile = 'users.json';
let users = [];

// Charger les utilisateurs depuis un fichier JSON
if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
} else {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
}

// Sauvegarder les utilisateurs dans le fichier JSON
const saveUsers = () => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// Middleware pour enregistrer les utilisateurs
bot.use((ctx, next) => {
    const userId = ctx.from.id;
    const username = ctx.from.username || ctx.from.first_name;

    // Vérifie si l'utilisateur existe déjà
    if (!users.find(user => user.id === userId)) {
        users.push({ id: userId, username });
        saveUsers();
    }

    return next();
});

// Commande pour afficher les utilisateurs
bot.command('users', (ctx) => {
    if (users.length === 0) {
        return ctx.reply("Aucun utilisateur n'a interagi avec ce bot.");
    }

    const userList = users.map(user => `- ${user.username} (${user.id})`).join('\n');
    ctx.reply(`Voici les utilisateurs enregistrés :\n\n${userList}`);
});

module.exports = bot;
