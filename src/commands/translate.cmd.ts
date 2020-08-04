import translate from '../modules/translate';

export const translateCommand = async (message: any, _args: Array<string> | undefined): Promise<void> => {
	const args: Array<string> = _args ? _args : [''];
	const from: string = args[0];
	const to:   string = args[1];
	const toTranslate: string = args.slice(2).join(' ');

	//console.log(toTranslate);

	try {
		const translation: string = await translate(toTranslate, from, to);

		return message.channel.send(translation);
	} catch (e) {
		return message.channel.send(`Não encontrei tradução de ${toTranslate} do ${from} para ${to}`);
	}
}

