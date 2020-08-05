import { Client } from 'discord.js';

import { setActivity } from '../utils/setActivity';

export const setPresence = (message: any, args: Array<string> | undefined, client: Client): void => {
	const modes: Array<'WATCHING' | 'LISTENING' | 'PLAYING' | 'STREAMING'> = [
		'WATCHING',
		'LISTENING',
		'PLAYING',
		'STREAMING'
	];
	const modesDesc: Array<string> = ['Assistindo', 'Ouvindo', 'Jogando', 'Streamando'];

	// normal execution
	if (args) {
		if (args[0] != 'help') {
			const newActivityName: string = args ? args.slice(1).join(' ') : 'Youtube';
			const newActivityType: number = args ? parseInt(args[0]) : 0;

			setActivity(client, 'online', newActivityName, modes[newActivityType]);

			return message.channel.send(`Atividade atualizada para: ${modesDesc[newActivityType]} ${newActivityName}`);
		}
	}

	// help execution
	// help with presence command
	let helpMessageArr: Array<string> = [];

	for (let mode of modesDesc) {
		helpMessageArr.push(`${modesDesc.indexOf(mode)}: ${mode}\n`);
	}

	return message.channel.send(`Lista de modos de presença:\n${helpMessageArr.join('')}`);
}

