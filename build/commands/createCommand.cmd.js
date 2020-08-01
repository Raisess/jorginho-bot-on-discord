"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.createCommand = async (message, args, uri) => {
    const getMessageText = args ? args.slice(1).join(' ') : '';
    const command = {
        guild: message.guild.name,
        creator_id: message.author.id,
        creator: message.author.username,
        command: args ? args[0] : '',
        message: getMessageText
    };
    const request = await node_fetch_1.default(`${uri}/command/create`, {
        method: 'post',
        body: JSON.stringify(command),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await request.json();
    if (data.success) {
        return message.channel.send(`Comando !${command.command} criado com sucesso!`);
    }
    return message.channel.send('Oops não consegui criar o comando, tente novamente...');
};
