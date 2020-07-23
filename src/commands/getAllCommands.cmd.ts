import fetch from 'node-fetch';

// TODO: get all commands from API and generate a list
export const getAllCommands = async (message: any, uri: string | undefined, prefix: string | undefined): Promise<void> => {
	const guild: string = message.guild.name;
	// fetch API
	const request: any = await fetch(`${uri}/command/get/${guild}`);
	const data: any = await request.json();

	// to store commands
	let commands: Array<string> = [];

	if (data.success) {
		for (let command of data.commands) {
			commands.push(`${prefix}${command.command}\n`);
		}

		// generate a string with commands
		let commandsList: string = commands.join(' ');

		return message.channel.send(`Lista de comandos de ${guild}:\n${commandsList}`);
	}

	return message.channel.send('**404 - Not Found**, esse servidor ainda não possui comandos.');
} 
