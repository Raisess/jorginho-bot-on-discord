import fetch from 'node-fetch';

import { CMD_PREFIX } from '../credencials.json';

interface ICommand {
	guild:      string;
	creator_id: string;
	creator:    string;
	command:    string;
	message:    string;
}

export const createCommand = async (message: any, args: Array<string> | undefined, uri: string | undefined): Promise<void> => {
	const getMessageText: string = args ? args.slice(1).join(' ') : '';

	const command: ICommand = {
		guild:       message.guild.name,
		creator_id:  message.author.id,
		creator:     message.author.username,
		command:     args ? args[0] : '',
		message:     getMessageText
	};

	// console.log(command);

	const request: any = await fetch(`${uri}/command/create`, {
		method: 'post',
		body: JSON.stringify(command),
		headers: { 'Content-Type': 'application/json' }
	});
	const data: any = await request.json();

	if (data.success) {
		return message.channel.send(`Comando '${CMD_PREFIX}${command.command}' criado com sucesso!`);
	}

	return message.channel.send('Oops não consegui criar o comando, tente novamente...');
}

