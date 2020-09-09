import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import translate from '../modules/translate';
import { colors } from '../utils/colors';

export const indication_ = async (message: any): Promise<void> => {
	const request = await fetch('https://api.reelgood.com/v3.0/content/roulette?content_kind=both&free=false&nocache=true&region=us&sources=netflix%2Camazon_prime%2Cdisney_plus%2Chbo_max%2Chbo%2Cfubo_tv%2Ccrunchyroll_premium%2Cfunimation%2Camc_premiere%2Cdc_universe%2Cmubi%2Ccinemax');
	const response = await request.json();
	
	const contents: any = {
		s: ['show', 'Série'],
		m: ['movie', 'Filme']
	};

	const indication: any = {
		id: response.id,
		title: response.title,
		description: response.overview,
		classification: response.classification,
		imdbRating: response.imdb_rating,
		contentType: contents[response.content_type]
	};

	const imgUrl: string = `https://img.reelgood.com/content/${indication.contentType[0]}/${indication.id}/poster-780.webp`;
	const translatedDesc: string = await translate(indication.description, 'eng', 'por');

	const embed: MessageEmbed = new MessageEmbed()
		.setColor(colors[Math.round(Math.random() * colors.length) - 1])
		.setTitle('🎰 ROLETA DA INDICAÇÃO 🎬')
		.setImage(imgUrl)
		.addField('Titulo:', indication.title)
		.addField('Descrição:', translatedDesc)
		.addField('Nota no IMDB:', indication.imdbRating, true)
		.addField('Tipo:', indication.contentType, true)
		.addField('Classificação indicativa', indication.classification, true);

	return message.channel.send(embed);
}

