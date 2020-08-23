export const server = (message: any): void => {
	return message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
}

