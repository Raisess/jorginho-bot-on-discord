import fetch from 'node-fetch';
import translate from '../modules/translate';

export const img = async (message: any, args: Array<string> | undefined): Promise<void> => {
	const apiKey: string = '15769415-02ee5908b6583da7cd7ae5fdb';
	const search: string = args ? args.join(' ').toLowerCase() : '';

	const translateSearch: string = await translate(search, 'por', 'eng');
	const removeSearchSpaces: string = translateSearch.replace(/\s+/g, '+');

	const request = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${removeSearchSpaces}`);
	const response = await request.json();

	const allImages: Array<any> = await response.hits;
	const randomImg: any = await allImages[Math.round(Math.random() * allImages.length - 1)];

	try {
		return message.channel.send(randomImg.webformatURL);
	} catch (e) {
		return message.channel.send(`Não achei imagens de: ${args ? args.join(' ') : ''}`);
	}
}

