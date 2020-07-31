import { Client } from 'discord.js';

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
			const newActivityName: string = args ? args[1] : 'Youtube';
			const newActivityType: number = args ? parseInt(args[0]) : 0;

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

	// help execution
	// help with presence command
	let helpMessageArr: Array<string> = [];

	for (let mode of modesDesc) {
		helpMessageArr.push(`${modesDesc.indexOf(mode)}: ${mode}\n`);
	}

	return message.channel.send(`Lista de modos de presença:\n${helpMessageArr.join('')}`);
}
