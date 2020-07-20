import { Client } from 'discord.js';
import { bot_token } from './credencials.json';

import { Command, command } from './command';

// setup client and setup bot command prefix
const client: Client = new Client();
const CMD_PREFIX: string = '!';

// setup all bot commands
const commands: Array<Command> = command();

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

	if (message.content.startsWith(CMD_PREFIX)){
		const args: Array<string> = message.content.slice(1).trim().split(' ');
		console.log(args);

		for (let _cmd of commands) {
			if (args[0] == _cmd.cmd) {
				return _cmd.func({ message: message, args: args.slice(1) });
			}
		}
	}
});

client.login(bot_token);

