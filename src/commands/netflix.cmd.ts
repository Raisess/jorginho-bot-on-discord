import fetch from 'node-fetch';
import translate from '../modules/translate';

export const indication_ = async (message: any): Promise<void> => {
	const request = await fetch('https://api.reelgood.com/v3.0/content/roulette?content_kind=both&free=false&nocache=true&region=us&sources=netflix%2Chulu_plus%2Camazon_prime%2Cdisney_plus%2Chbo_max%2Chbo%2Cpeacock%2Capple_tv_plus%2Cfubo_tv%2Cshowtime%2Cstarz%2Ccbs_all_access%2Cepix%2Ccrunchyroll_premium%2Cfunimation%2Camc_premiere%2Ckanopy%2Choopla%2Ccriterion_channel%2Cbritbox%2Cdc_universe%2Cmubi%2Ccinemax%2Cfandor%2Cacorntv%2Challmark_movies_now%2Cbet_plus%2Cshudder%2Cyoutube_premium%2Cindieflix');
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

	const text: string = `🎰 ROLETA DA INDICAÇÃO 🎬\nTitulo: ${indication.title}\nTipo: ${indication.contentType[1]}\nDescrição: ${translatedDesc}\nClassificação: ${indication.classification}\nNota no IMDB: ${indication.imdbRating}\n${imgUrl}`;

	return message.channel.send(text);
}

