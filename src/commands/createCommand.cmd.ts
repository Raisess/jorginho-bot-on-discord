import fetch from 'node-fetch';

export const createCommand = async (message: any, args: Array<string> | undefined, uri: string | undefined): Promise<void> => {
	const getMessageText: string = args ? args.slice(1).join(' ') : '';

	const command = {
		guild: message.guild.name,
		creator: message.author.username,
		command: args ? args[0] : '',
		message: getMessageText
	};

	// console.log(command);

	const request = await fetch(`${uri}/command/create`, {
		method: 'post',
		body: JSON.stringify(command),
		headers: { 'Content-Type': 'application/json' }
	});
	const data = await request.json();

	if (await data.success) {
		return message.channel.send(`comando !${command.command} criado com sucesso!`);
	}

	return message.channel.send('ops não consegui criar o comando, tente novamente...');
}
