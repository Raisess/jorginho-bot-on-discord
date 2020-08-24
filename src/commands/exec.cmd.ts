import { exec } from 'shelljs';

// utils
import { checkOwnerId } from '../utils/checkOwnerId';

export const execCommand = (message: any, args: Array<string> | undefined): void => {
	const authorId:  string = message.author.id;
	const argsJoin:  string = args ? args.join(' ') : '';
	const execution: any    = exec(argsJoin);

	if (checkOwnerId(authorId)) {
		return message.channel.send(execution.stdout, { code: 'shell' });
	}

	return message.channel.send(':octagonal_sign: Comando disponivel somente para programadores!!! :octagonal_sign:');
}

