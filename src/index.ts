import { Client } from 'discord.js';
import fetch from 'node-fetch';

// some config data
import {
	bot_token,
	owner_id,
	CMD_PREFIX,
	uri
} from './credencials.json';

// message filters
import {
	messageEngine,
	MessageEngineCommand
} from './messageEngine';

// utils
import { predefinedActivity } from './utils/predefinedActivity';
import { checkOwnerId } from './utils/checkOwnerId';  
import { blackListCheck } from './utils/blackListCheck';

// commands
import {
	Command,
	command
} from './command';

// conversation module
import { conversation } from './modules/botIA';

// setup client
const client: Client = new Client();

// setup all bot commands
const commands: Array<Command> = command();
// bot initial state
let ON: boolean = true;

// on bot init
client.on('ready', (): boolean => {
	console.log('jorginho bot is ready yaaah!');

	return predefinedActivity(client);
});

// on new user enter the server
client.on('guildMemberAdd', async (member: any): Promise<void> => {
 	const channel = member.guild.channels.cache.find((ch: any) => ch.name == '👋-welcomes' || ch.name == 'welcomes');
	if (!channel) return;

	const serverName = member.guild.name;
	return channel.send(`Bem vindo ao servidor ${serverName}, ${member}!`);
});

// on send message
client.on('message', (message: any): void | boolean => {
	// main definitions
	const guild:     string        = message.guild.name;
	const username:  string        = message.author.username;
	const userId:    string        = message.author.id;
	const args:      Array<string> = message.content.slice(CMD_PREFIX.length).trim().split(' ');
	const messageLC: string        = message.content.toLowerCase();

	if (!blackListCheck(guild) || checkOwnerId(userId)) {
		const messageLog: string = `[${guild} at ${new Date().toLocaleString()}]<${userId}>${username}: ${message.content}`;

		if (message.author.bot) {
			// show message on console
			console.log(messageLog);	
			return;
		}

		// show message on console
		console.log(messageLog);

		const sendMessageFunction = (text: string): any => message.channel.send(text);

		if (messageLC == `${CMD_PREFIX}power off` && checkOwnerId(userId)) {
			ON = false;
			predefinedActivity(client);

			return sendMessageFunction('Câmbio desligo!');
		} else if (messageLC == `${CMD_PREFIX}power on` && checkOwnerId(userId)) {
			ON = true;
			predefinedActivity(client);

			return sendMessageFunction('Voltei');
		} else if (messageLC.startsWith(`${CMD_PREFIX}power`) && !checkOwnerId(userId)) {
			const owners:        Array<string> = owner_id;
			let editedOwnersArr: Array<string> = [];
	
			for (let owner of owners) {
				editedOwnersArr.push(`<@${owner}>`);
			}

			const editedOwners: string = editedOwnersArr.join(' ,');

			return sendMessageFunction(`Comando disponivel somente para ${editedOwners} não sou obrigado a te obdecer seu tchola!`);
		}

		if (ON || (checkOwnerId(userId) && messageLC.startsWith(CMD_PREFIX))) {
			// check if message has a command
			if (messageLC.startsWith(CMD_PREFIX)) {
				// test user join
				if (args[0] == 'join') {
					return client.emit('guildMemberAdd', message.member);
				}

				// loop primitive commands
				for (let _cmd of commands) {
					if (args[0].toLowerCase() == _cmd.cmd) {
						return _cmd.func({
							message: message,
							args:    args.slice(1),
							uri:     uri,
							prefix:  CMD_PREFIX,
							client:  client
						});
					}
				}

				// get custom commands from API
				(async (guildName: string, message: any, argsList: Array<string>): Promise<void> => {
					// api fetch
					const request: any = await fetch(`${uri}/command/get/${guildName}/${argsList[0]}`);
					const data:    any = await request.json();

					if (data.success) {
						const messageData: MessageEngineCommand = await data.command;

						return sendMessageFunction(messageEngine(message, messageData));
					}

					return sendMessageFunction('**404 - Not Found**, comando inexistente nesse servidor...');
				})(guild, message, args);
			} else {
				if (message.channel.name == '🤖-bot-spam' || message.channel.name == 'bot-spam') {
					// bot normal conversation
					(async (question: string) => {
						const botMessage:    string = await conversation(question);
						const trasformedMsg: string = await messageEngine(message, { message: botMessage, creator_id: 'guest' });

						return sendMessageFunction(trasformedMsg);
					})(messageLC);
				}
			}
		} else if (messageLC.startsWith(CMD_PREFIX)) {
			return sendMessageFunction('Estou indisponivel no momento, tente mais tarde...');
		}
	}

	return;
});

// updated predefinedActivity
setInterval(() => predefinedActivity(client), 60 * 10000);

// ignore some errors
process.on('uncaughtException', (err: any) => {
  console.log(err);
	return;
});

client.login(bot_token);

