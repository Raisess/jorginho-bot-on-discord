const messageEngine = (message: any, messageToSend: string): string => {
	const customMessage: string = messageToSend.replace(/\{username}/g, `<@${message.author.id}>`);

	return customMessage;
}

export default messageEngine;

