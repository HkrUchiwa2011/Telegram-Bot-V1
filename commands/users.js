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
        if (ctx.chat.type === 'private') {
            return ctx.reply("Cette commande est utilisable uniquement dans les groupes.");
        }

        try {
            const chatMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);

            if (['administrator', 'creator'].includes(chatMember.status)) {
                if (users.length === 0) {
                    return ctx.reply("Aucun utilisateur n'a interagi avec ce bot.");
                }

                const userList = users.map(user => `- ${user.username} (${user.id})`).join('\n');
                ctx.reply(`Voici les utilisateurs enregistrés :\n\n${userList}`);
            } else {
                ctx.reply("Seuls les administrateurs peuvent utiliser cette commande.");
            }
        } catch (error) {
            console.error("Erreur lors de la vérification des droits :", error.message);
            ctx.reply("Erreur lors de la vérification des droits.");
        }
    });
}

module.exports = registerUsersCommand;
