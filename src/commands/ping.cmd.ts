import { Client } from 'discord.js';

export const ping = async (message: any, client: Client): Promise<void> => {
	const msg = await message.channel.send("Pinging...");

	return msg.edit(`Pong: ${Math.round(msg.createdTimestamp - message.createdTimestamp)}ms`);
}

