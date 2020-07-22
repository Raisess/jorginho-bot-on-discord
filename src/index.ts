import { Client } from 'discord.js';
import fetch from 'node-fetch';

import { bot_token } from './credencials.json';

import messageEngine from './messageEngine';
import {
	Command,
	command
} from './command';

// setup client and setup bot command prefix
const client: Client = new Client();
const CMD_PREFIX: string = '!';

// setup all bot commands
const commands: Array<Command> = command();
// bot API uri
const uri: string = 'http://localhost:1939';

// on bot init
client.once('ready', (): boolean => {
	console.log('jorginho bot is ready yaaah!');

	// setting bot activity
	client.user.setPresence({
	  status: 'online',
	  activity: {
	    name: 'xvideos.com',
	    type: 'WATCHING' //PLAYING: WATCHING: LISTENING: STREAMING:
	  }
	});

	return true;
});

client.on('message', (message: any): void => {
	if (message.author.bot) return;
	// main definitions
	const guild: string = message.guild.name.toLowerCase().replace(/\s+/g, '_');
	const args: Array<string> = message.content.slice(1).trim().split(' ');
	const sendMessageFunction = (text: string): any => message.channel.send(text);

	if (message.content.startsWith(CMD_PREFIX)){
		// console.log(args);
		for (let _cmd of commands) {
			if (args[0] == _cmd.cmd) {
				return _cmd.func({
					message: message,
					args: args.slice(1),
					uri: uri
				});
			}
		}

		// get commands from API
		(async (guildName: string, sendMsgFunc: any, message: any, argsList: Array<string>): Promise<void> => {
			// api fetch
			const request = await fetch(`${uri}/command/get/${guildName}/${argsList[0]}`);
			const data = await request.json();

			if (await data.success) {
				const messageToSend = await data.command.message;

				return sendMessageFunction(messageEngine(message, messageToSend));
			}

			return sendMessageFunction('404 - Not Found, comando inexistente nesse servidor...');
		})(guild, sendMessageFunction, message, args);
	}
});

client.login(bot_token);

