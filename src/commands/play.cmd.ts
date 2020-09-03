import { Client, MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core-discord';
import yts from 'yt-search';

import { colors } from '../utils/colors';
import { setActivity } from '../utils/setActivity';

export const play = async (message: any, args: Array<string> | undefined, client: Client): Promise<boolean | any> => {
	const voiceChannel: any = message.member.voice.channel;

	const music: string = args ? args.join(' ') : '';
	let musicId: Array<string>;

	if (music != 'stop') {
		message.channel.send(`Calma tô caçando aqui essa música: ${music}...`);
	}

	// play music with direct link
	if (music.startsWith('https://')) {
		if (music.split('/').indexOf('youtu.be') != -1) {
			musicId = ['cell', music.split('be/')[1]];
		} else {
			musicId = ['pc', music.split('=')[1]];
		}

		return playMusic(message, client, music, musicId, voiceChannel);
	} else {
		// play music with name
		if (music == 'stop') {
			voiceChannel.leave();
			message.channel.send(`Tá bem <@${message.author.id}>, eu paro chatx`);

			setActivity(client, 'online', 'Youtube', 'WATCHING');

			return true;
		} else {
			console.log('music:', music);

			const res: any = await yts(music);
			const videos: Array<any> = await res.videos;
			const videoUrl: string = await videos[0].url;

			musicId = ['pc', await videoUrl.split('=')[1]];

			return playMusic(message, client, videoUrl, musicId, voiceChannel);
		}
	}
}

const playMusic = async (message: any, client: Client, music: string, musicId: Array<string>, voiceChannel: any): Promise<boolean | any> => {	
	try {
		const streamOptions = {
			volume: false,
			type:   'opus',
			highWaterMark: 10
		};

		const stream: any = await ytdl(music, {
			filter:  'audioonly',
			quality: 'highestaudio'
		});

		const info: any = await ytdl.getInfo(musicId[1]);
 		// voice connection
		const connection: any = await voiceChannel.join();
		const dispatcher: any = await connection.play(stream, streamOptions);

		// music info
		const videoDetails: any = info.player_response.videoDetails;
		const musicName: string = videoDetails.title;
		const thumbnail: string = videoDetails.thumbnail.thumbnails[3].url;
		const author:    string = videoDetails.author;
		const views:     string = videoDetails.viewCount;
		const duration:  string = String((parseInt(videoDetails.lengthSeconds) / 60).toFixed(2)).replace(/\./g, ':');

		//console.log(duration);

		// on music starts
		dispatcher.on('start', () => {
			setActivity(client, 'online', musicName, 'LISTENING');

			const embed: MessageEmbed = new MessageEmbed()
				.setColor(colors[Math.round(Math.random() * colors.length) - 1])
				.setTitle(musicName)
				.setURL(music)
				.setImage(thumbnail)
				.addField('Tocando:', musicName)
				.addField('Autor:', author)
				.addField('Visualizações:', views, true)
				.addField('Duração:', duration, true);
			
			message.channel.send(embed);
		});

		// on music ends
 		dispatcher.on('finish', (end: any) => {
   		voiceChannel.leave();
			message.channel.send('Cabou a música, põe outra ae cria');
			setActivity(client, 'online', 'Youtube', 'WATCHING');

			return true;
 		});

		// on music error
		dispatcher.on('error', (err: any) => {
   		voiceChannel.leave();
			message.channel.send('Eii boy a música miou aqui, e agr???');
			setActivity(client, 'online', 'Youtube', 'WATCHING');

			return false;
		});
	} catch (e) {
		message.channel.send('Eu não sou nenhum gênio ou algo parecido, mas aparentemente você tem q estar no voice pra me ouvir não acha?');

		return true;
	}
}

