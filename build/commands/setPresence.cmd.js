"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPresence = void 0;
exports.setPresence = (message, args, client) => {
    const modes = [
        'WATCHING',
        'LISTENING',
        'PLAYING',
        'STREAMING'
    ];
    const modesDesc = ['Assistindo', 'Ouvindo', 'Jogando', 'Streamando'];
    if (args) {
        if (args[0] != 'help') {
            const newActivityName = args ? args[1] : 'Youtube';
            const newActivityType = args ? parseInt(args[0]) : 0;
            client.user.setPresence({
                status: 'online',
                activity: {
                    name: newActivityName,
                    type: modes[newActivityType]
                }
            });
            return message.channel.send(`Atividade atualizada para: ${modesDesc[newActivityType]} ${newActivityName}`);
        }
    }
    let helpMessageArr = [];
    for (let mode of modesDesc) {
        helpMessageArr.push(`${modesDesc.indexOf(mode)}: ${mode}\n`);
    }
    return message.channel.send(`Lista de modos de presença:\n${helpMessageArr.join('')}`);
};
