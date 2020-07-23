import { Client } from 'discord.js';

import { server } from './commands/server.cmd';
import { createCommand } from './commands/createCommand.cmd';
import { getAllCommands } from './commands/getAllCommands.cmd';

interface Params {
	message: any;
	args?: Array<string> | undefined;
	uri?: string | undefined;
	prefix?: string | undefined;
}

export interface Command {
	cmd: string;
	description: string;
	func: Function;
}

export const command = (): Array<Command> => {
	return [
		{
			cmd: 'server',
			description: 'Ver as informações do servidor.',
			func: (param: Params): Function => server(param.message)
		},
		{
			cmd: 'create',
			description: 'Criar novos commandos.',
			func: async (param: Params): Promise<void> => await createCommand(param.message, param.args, param.uri)
		},
		{
			cmd: 'commands',
			description: 'Ver os comandos do servidor.',
			func: async (param: Params): Promise<void> => await getAllCommands(param.message, param.uri, param.prefix)
		}
	]
}
