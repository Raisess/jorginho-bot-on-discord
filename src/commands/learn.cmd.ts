import { learn } from '../modules/botIA';

export const learnCommand = async (message: any, args: Array<string> | undefined): Promise<void> => {
	const getMessageArgs: Array<string> = args ? args.join(' ').split('/').map(e => e.trim()) : [''];

	console.log(getMessageArgs);

	const question: string = getMessageArgs[0];
	const response: string = getMessageArgs[1];

	const tryLearn: boolean = await learn(question, response);

	if (tryLearn) {
		return message.channel.send(`entt quer dizer q qnd me disserem "${question}", devo responder "${response}, nice!"`);
	}

	return message.channel.send('n entendi foi nada...');
}

