const fs = require('fs');

function registerUsersCommand(bot) {
    const usersFile = 'users.json';
    let users = [];

    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    } else {
        fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
    }

    const saveUsers = () => {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    };

    bot.use((ctx, next) => {
        const userId = ctx.from.id;
        const username = ctx.from.username || ctx.from.first_name;
        if (!users.find(user => user.id === userId)) {
            users.push({ id: userId, username });
            saveUsers();
        }
        return next();
    });

    bot.command('users', async (ctx) => {
        const chatMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
        if (chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
            return ctx.reply("Seuls les administrateurs peuvent utiliser cette commande.");
        }

        if (users.length === 0) {
            return ctx.reply("Aucun utilisateur n'a interagi avec ce bot.");
        }

        const userList = users.map(user => `- ${user.username} (${user.id})`).join('\n');
        ctx.reply(`Voici les utilisateurs enregistrés :\n\n${userList}`);
    });
}

module.exports = registerUsersCommand;
