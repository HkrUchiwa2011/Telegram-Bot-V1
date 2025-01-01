module.exports = (bot) => {
    bot.command('help', (ctx) => {
        const commands = [
            { command: '/ai', description: 'poser des questions' },
            { command: '/help', description: 'Afficher cette liste des commandes' },
            { command: '/admin', description: 'Voir la liste des administrateurs' },
            { command: '/addadmin <ID>', description: 'Ajouter un admin' },
            { command: '/removeadmin <ID>', description: 'Retirer un admin' },
            { command: '/translate <langue_source> <langue_cible> <texte>', description: 'Traduire vos textes dans tous les langues que vous souhaitez 🌐' },
            { command: '/start', description: 'démarrage du bot' },
            { command: '/getid', description: 'Obtenez votre ID Telegram' },
            { command: '/imgbb', description: 'transforme les photos en lien' },
            { command: '/pin', description: 'Recherchez vos images' },
            { command: '/call', description: 'Contactez admin du bot' },
            { command: '/lyrics', description: 'Retrouvez les paroles de vos chansons' },
            { command: '/out' , description : 'Permet de faire sortir le bot dun groupe'},
            { command: '/users' , description : 'Permet de voir les utilisateurs du bot'},
            { command: '/ban' , description : 'Aide les administrateurs du groupe à bannir'},
            { command: '/ban' , description : 'Rechercher vos vidéos'},
    
       
        ];

        let message = '📜 **Liste des commandes disponibles :**\n\n';
        commands.forEach(cmd => {
            message += `╭─❍\n│ ✧${cmd.command} \n│- ${cmd.description}\n╰─━━━━━━━━━━━━━╾─◊\n`;
        });

        ctx.replyWithMarkdown(message);
    });
};
