import { Client } from 'discord.js';
import { bot_token } from '../credencials.json';

import { checkOwnerId } from '../utils/checkOwnerId';  

export const reset = (client: Client, message: any): void => {
	if (checkOwnerId(message.author.id)) {
		return message.channel.send('Reiniciando...')
	  	.then(() => client.destroy())
				.then(() => client.login(bot_token));
	}

	return message.channel.send(`:octagonal_sign: <@${message.author.id}> vc não tem permissão para usar este comando!!! :octagonal_sign:`);
}

