import { exec } from 'shelljs';

// utils
import { checkOwnerId } from '../utils/checkOwnerId';

export const execCommand = (message: any, args: Array<string> | undefined): void => {
	const authorId:  string = message.author.id;
	const argsJoin:  string = args ? args.join(' ') : '';

	if (checkOwnerId(authorId)) {
		const execution: any    = exec(argsJoin);
		
		if (execution.stdout.length < 2000) {
			if (execution.stdout.length == 0) {
				return;
			}

			return message.channel.send(execution.stdout, { code: 'shell' });
		}

		return message.channel.send('Infelizmente o discord não aceita mensagens com mais de 2000 caracteres, favor checar o terminal... :cry:');
	}

	return message.channel.send(':octagonal_sign: Comando disponivel somente para programadores!!! :octagonal_sign:');
}

