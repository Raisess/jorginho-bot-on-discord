import { search } from 'urban-ts';
import translate from '../modules/translate';  

export const wiki = async (message: any, args: Array<string> | undefined): Promise<void> => {
	const query: string = args ? args.join('+') : '';

	const translatedQuery: string = await translate(query, 'por', 'eng');

	const data:       any    = await search(translatedQuery);
	const definition: string = await translate(data.definition, 'eng', 'por');

	return message.channel.send(definition);
}

