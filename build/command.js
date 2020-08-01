"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const server_cmd_1 = require("./commands/server.cmd");
const voice_cmd_1 = require("./commands/voice.cmd");
const createCommand_cmd_1 = require("./commands/createCommand.cmd");
const getAllCommands_cmd_1 = require("./commands/getAllCommands.cmd");
const setPresence_cmd_1 = require("./commands/setPresence.cmd");
const play_cmd_1 = require("./commands/play.cmd");
const insta_cmd_1 = require("./commands/insta.cmd");
const img_cmd_1 = require("./commands/img.cmd");
exports.command = () => {
    return [
        {
            cmd: 'server',
            description: 'Ver as informações do servidor.',
            func: (param) => server_cmd_1.server(param.message)
        },
        {
            cmd: 'jorge?',
            description: 'Ver se o bot tá on.',
            func: (param) => param.message.channel.send('oii!')
        },
        {
            cmd: 'voice',
            description: 'Conectar no voice do usuario.',
            func: async (param) => await voice_cmd_1.voice(param.message)
        },
        {
            cmd: 'play',
            description: 'Tocar uma musica',
            func: async (param) => await play_cmd_1.play(param.message, param.args, param.client)
        },
        {
            cmd: 'insta',
            description: 'Buscar a foto de perfil de alguem no instagram',
            func: (param) => insta_cmd_1.insta(param.message, param.args)
        },
        {
            cmd: 'img',
            description: 'Buscar uma imagem aleatoria',
            func: async (param) => await img_cmd_1.img(param.message, param.args)
        },
        {
            cmd: 'create',
            description: 'Criar novos commandos.',
            func: async (param) => await createCommand_cmd_1.createCommand(param.message, param.args, param.uri)
        },
        {
            cmd: 'commands',
            description: 'Ver os comandos do servidor.',
            func: async (param) => await getAllCommands_cmd_1.getAllCommands(param.message, param.uri, param.prefix)
        },
        {
            cmd: 'presence',
            description: 'Mudar a atividade do bot.',
            func: (param) => setPresence_cmd_1.setPresence(param.message, param.args, param.client)
        }
    ];
};
