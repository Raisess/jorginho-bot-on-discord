import { Client } from 'discord.js';

import { server } from './commands/server.cmd';
import { voice } from './commands/voice.cmd';
import { createCommand } from './commands/createCommand.cmd';
import { getAllCommands } from './commands/getAllCommands.cmd';
import { setPresence } from './commands/setPresence.cmd';
import { play } from './commands/play.cmd'
import { insta } from './commands/insta.cmd';
import { img } from './commands/img.cmd';
import { indication_ } from './commands/netflix.cmd';
import { translateCommand } from './commands/translate.cmd';
import { ping } from './commands/ping.cmd';
import { evalCommand } from './commands/eval.cmd';
import { reset } from './commands/reset.cmd';
import { wiki } from './commands/wiki.cmd';
import { execCommand } from './commands/exec.cmd';
import { kick, ban } from './commands/kickAndBan.cmd';

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
			func: (param: Params): void => server(param.message)
		},
		{
			cmd: 'kick',
			description: 'Kickar um usuário do servidor',
			func: (param: Params): void => kick(param.message)
		},
		{
			cmd: 'ban',
			description: 'Banir um usuário do servidor',
			func: (param: Params): void => ban(param.message)
		},
		{
			cmd: '=>',
			description: 'Eval de código.',
			func: (param: Params): void => evalCommand(param.message, param.args)
		},
		{
			cmd: 'reset',
			description: 'Reinicia o bot.',
			func: (param: Params): void => reset(param.client, param.message)
		},
		{
			cmd: 'voice',
			description: 'Conectar no voice do usuario.',
			func: async (param: Params): Promise<boolean> => await voice(param.message)
		},
		{
			cmd: 'play',
			description: 'Tocar uma musica.',
			func: async (param: Params): Promise<boolean> => await play(param.message, param.args, param.client)
		},
		{
			cmd: 'wiki',
			description: 'Buscar uma página na Wikipédia',
			func: async (param: Params): Promise<void> => await wiki(param.message, param.args)
		},
		{
			cmd: '>',
			description: 'Executar um comando no terminal via mensagem',
			func: (param: Params): void => execCommand(param.message, param.args)
		},
		{
			cmd: 'insta',
			description: 'Buscar a foto de perfil de alguem no instagram.',
			func: (param: Params): void => insta(param.message, param.args)
		},
		{
			cmd: 'img',
			description: 'Buscar uma imagem aleatoria.',
			func: async (param: Params): Promise<void> => await img(param.message, param.args)
		},
		{
			cmd: 'indication',
			description: 'Indicação de filme ou série.',
			func: async (param: Params): Promise<void> => await indication_(param.message)
		},
		{
			cmd: 'translate',
			description: 'Traduzir algo, ex: !translate eng por you are ok?',
			func: async (param: Params): Promise<void> => await translateCommand(param.message, param.args)
		},
		{
			cmd: 'ping',
			description: 'Checar o ping do bot.',
			func: async (param: Params): Promise<void> => await ping(param.message, param.client)
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
