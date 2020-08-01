"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const credencials_json_1 = require("./credencials.json");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const messageEngine_1 = require("./messageEngine");
const command_1 = require("./command");
const botIA_1 = __importDefault(require("./modules/botIA"));
const client = new discord_js_1.Client();
const CMD_PREFIX = '!';
const commands = command_1.command();
const uri = 'https://api-jorginhobot.herokuapp.com';
client.once('ready', () => {
    console.log('jorginho bot is ready yaaah!');
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Spotify',
            type: 'LISTENING'
        }
    });
    return true;
});
client.on('message', (message) => {
    if (message.author.bot)
        return;
    const guild = message.guild.name;
    const args = message.content.slice(1).trim().split(' ');
    const sendMessageFunction = (text) => message.channel.send(text);
    if (message.content.startsWith(CMD_PREFIX)) {
        for (let _cmd of commands) {
            if (args[0] == _cmd.cmd) {
                return _cmd.func({
                    message: message,
                    args: args.slice(1),
                    uri: uri,
                    prefix: CMD_PREFIX,
                    client: client
                });
            }
        }
        (async (guildName, sendMsgFunc, message, argsList) => {
            const request = await node_fetch_1.default(`${uri}/command/get/${guildName}/${argsList[0]}`);
            const data = await request.json();
            if (data.success) {
                const messageData = await data.command;
                return sendMessageFunction(messageEngine_1.messageEngine(message, messageData));
            }
            return sendMessageFunction('**404 - Not Found**, comando inexistente nesse servidor...');
        })(guild, sendMessageFunction, message, args);
    }
    else {
        (async (question) => {
            const botMessage = await botIA_1.default(question);
            return message.channel.send(botMessage);
        })(message.content);
    }
});
client.login(credencials_json_1.bot_token);
const app = express_1.default();
app.use(cors_1.default());
app.get('/', (req, res) => res.json({ ping: 'pong' }));
app.listen(config_1.PORT, () => console.log('running on port:', config_1.PORT));
