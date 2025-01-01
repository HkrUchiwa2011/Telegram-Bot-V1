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
        const chatType = ctx.chat.type;

        if (chatType === 'private') {
            const chatMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);

            if (!['creator', 'administrator'].includes(chatMember.status)) {
                return ctx.reply("Cette commande est réservée aux administrateurs.");
            }

            const userList = users.map(user => `- ${user.username} (${user.id})`).join('\n');
            return ctx.reply(`Liste des utilisateurs du bot :\n\n${userList}`);
        }

        if (chatType === 'group' || chatType === 'supergroup') {
            const members = await ctx.telegram.getChatMembers(ctx.chat.id);
            const memberList = members.map(member => `- ${member.user.first_name || member.user.username}`).join('\n');
            ctx.reply(`Membres du groupe :\n\n${memberList}`);
        }
    });
}

module.exports = registerUsersCommand;
