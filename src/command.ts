import { Client } from 'discord.js';

import { server } from './commands/server.cmd';
import { voice } from './commands/voice.cmd';
import { createCommand } from './commands/createCommand.cmd';
import { getAllCommands } from './commands/getAllCommands.cmd';
import { setPresence } from './commands/setPresence.cmd';
import { play } from './commands/play.cmd'

interface Params {
	message: any;
	args?: Array<string> | undefined;
	uri?: string | undefined;
	prefix?: string | undefined;
	client: Client;
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
			cmd: 'jorge?',
			description: 'Ver se o bot tá on.',
			func: (param: Params): void => param.message.channel.send('oii!')
		},
		{
			cmd: 'voice',
			description: 'Conectar no voice do usuario.',
			func: async (param: Params): Promise<boolean> => await voice(param.message)
		},
		{
			cmd: 'play',
			description: 'Tocar uma musica',
			func: async (param: Params): Promise<boolean> => await play(param.message, param.args, param.client)
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
		},
		{
			cmd: 'presence',
			description: 'Mudar a atividade do bot.',
			func: (param: Params): void => setPresence(param.message, param.args, param.client)
		}
	]
}
