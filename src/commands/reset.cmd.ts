import { Client } from 'discord.js';
import { bot_token } from '../credencials.json';

export const reset = (client: Client, message: any): void => {
	message.channel.send('Reiniciando...')
	  .then(() => client.destroy())
			.then(() => client.login(bot_token));
}

