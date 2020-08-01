"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommands = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.getAllCommands = async (message, uri, prefix) => {
    const guild = message.guild.name;
    const request = await node_fetch_1.default(`${uri}/command/get/${guild}`);
    const data = await request.json();
    let commands = [];
    if (data.success) {
        for (let command of data.commands) {
            commands.push(`${prefix}${command.command}\n`);
        }
        let commandsList = commands.join('');
        return message.channel.send(`Lista de comandos de ${guild}:\n${commandsList}`);
    }
    return message.channel.send('**404 - Not Found**, esse servidor ainda não possui comandos.');
};
