export const hello = (message: any): Function => {
	return message.channel.send(`hello, @${message.author.username}!`);
}
