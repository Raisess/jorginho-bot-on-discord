import { server } from './commands/server.cmd';
import { hello } from './commands/hello.cmd';
import { createCommand } from './commands/createCommand.cmd';

interface Params {
	message: any;
	args?: Array<string> | undefined;
	uri?: string | undefined;
}

export interface Command {
	cmd: string,
	description: string,
	func: Function
}

export const command = (): Array<Command> => {
	return [
		{
			cmd: 'server',
			description: 'Ver as informações do servidor.',
			func: (param: Params): Function => server(param.message)
		},
		{
			cmd: 'hello',
			description: '',
			func: (param: Params): Function => hello(param.message)
		},
		{
			cmd: 'create',
			description: 'Criar novos commandos.',
			func: async (param: Params): Promise<void> => await createCommand(param.message, param.args, param.uri)
		}
	]
}
