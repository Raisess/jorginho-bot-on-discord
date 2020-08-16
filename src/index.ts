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
import { setActivity } from './utils/setActivity';
import { checkOwnerId } from './utils/checkOwnerId';  

// commands
import {
	Command,
	command
} from './command';

// conversation module
import { conversation } from './modules/botIA';

// setup client and setup bot command prefix
const client: Client = new Client();
// setup all bot commands
const commands: Array<Command> = command();
// bot initial state
let ON: boolean = true;

// on bot init
client.on('ready', (): boolean => {
	console.log('jorginho bot is ready yaaah!');
	setActivity(client, 'online', 'spotify', 'LISTENING');

	return true;
});

// on new user enter the server
client.on('guildMemberAdd', async (member: any): Promise<void> => {
 	const channel = member.guild.channels.cache.find((ch: any) => ch.name == '👋-welcomes' || ch.name == 'boas-vindas');
	if (!channel) return;

	const serverName = member.guild.name;
	return channel.send(`Bem vindo ao servidor ${serverName}, ${member}!`);
});

// on send message
client.on('message', (message: any): void | boolean => {
	if (message.author.bot) {
		// show message on console
		console.log(`${message.author.username}<${message.author.id}>:`, message.content);
		
		return;
	}

	// show message on console
	console.log(`${message.author.username}<${message.author.id}>:`, message.content);

	const sendMessageFunction = (text: string): any => message.channel.send(text);

	if (message.content == `${CMD_PREFIX}power off` && checkOwnerId(message.author.id)) {
		ON = false;
		setActivity(client, 'idle', 'Lo-Fi hip-hop', 'LISTENING');

		return sendMessageFunction('Câmbio desligo!');
	} else if (message.content == `${CMD_PREFIX}power on` && checkOwnerId(message.author.id)) {
		ON = true;
		setActivity(client, 'online', 'Netflix', 'WATCHING');

		return sendMessageFunction('Voltei');
	} else if (message.content.startsWith(`${CMD_PREFIX}power`) && !checkOwnerId(message.author.id)) {
		let owners: Array<string> = owner_id;
	
		for (let owner of owners) {
			owner = `<@${owner}>`;
		}

		const editedOwners: string = owners.join(' ,');

		return sendMessageFunction(`Comando disponivel somente para ${editedOwners}> não sou obrigado a te obdecer seu tchola!`);
	}

	if (ON || ((message.author.id == owner_id[0] || message.author.id == owner_id[1]) && message.content.startsWith(CMD_PREFIX))) {
		// main definitions
		const guild: string        = message.guild.name;
		const args:  Array<string> = message.content.slice(1).trim().split(' ');

		// check if message has a command
		if (message.content.startsWith(CMD_PREFIX)) {
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
			if (message.channel.name == '🤖-bot-spam' || message.channel.name == 'bot') {
				// bot normal conversation
				(async (question: string) => {
					const botMessage:    string = await conversation(question);
					const trasformedMsg: string = await messageEngine(message, { message: botMessage, creator_id: 'guest' });

					return sendMessageFunction(trasformedMsg);
				})(message.content);
			}
		}
	} else if (message.content.startsWith(CMD_PREFIX)) {
		return sendMessageFunction('Estou indisponivel no momento, tente mais tarde...');
	}
});

// ignore some errors
process.on('uncaughtException', (err: any) => {
  console.log(err);
	return;
});

client.login(bot_token);

