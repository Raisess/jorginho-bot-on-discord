import { Client } from 'discord.js';
import ytdl from 'ytdl-core-discord';
import yts from 'yt-search';

export const play = async (message: any, args: Array<string> | undefined, client: Client): Promise<boolean | any> => {
	const voiceChannel = message.member.voice.channel;

	const music: string = args ? args.join(' ') : '';
	let musicId: Array<string>;

	//console.log('joined channel');

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

			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'Youtube',
					type: 'WATCHING'
				}
			});

			return true;
		} else {
			yts(music, async (err: any, res: any): Promise<boolean> => {
				const videos: Array<any> = await res.videos;
				const videoUrl: string = await videos[0].url;

				musicId = ['pc', await videoUrl.split('=')[1]];

				return playMusic(message, client, videoUrl, musicId, voiceChannel);
			});
		}
	}
}

const playMusic = async (message: any, client: Client, music: string, musicId: Array<string>, voiceChannel: any): Promise<boolean | any> => {	
	try {
		const streamOptions = {
			volume: false,
			type: 'opus',
			highWaterMark: 50
		};

		const stream = await ytdl(music, {
			filter: 'audioonly',
			quality: 'highestaudio'
		});

		const info = await ytdl.getInfo(musicId[1]);
 		// voice connection
		const connection = await voiceChannel.join();
		const dispatcher = connection.play(stream, streamOptions);

		// music info
		const musicName: string = info.player_response.videoDetails.title;
		const thumbnail: string = info.player_response.videoDetails.thumbnail.thumbnails[3].url

		// on music starts
		dispatcher.on('start', () => {
			client.user.setPresence({
				status: 'online',
				activity: {
					name: musicName,
					type: 'LISTENING'
				}
			});

			message.channel.send(`Tocando: ${musicName}`);
			message.channel.send(thumbnail);
		});

		// on music ends
 		dispatcher.on('finish', (end: any) => {
   		voiceChannel.leave();
			message.channel.send('Cabou a música, põe outra ae cria');

			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'Youtube',
					type: 'WATCHING'
				}
			});

			return true;
 		});

		// on music error
		dispatcher.on('error', (err: any) => {
			message.channel.send('Eii boy a música miou aqui, e agr???');

			return false;
		});
	} catch (e) {
		message.channel.send('Eu não sou nenhum gênio ou algo parecido, mas aparentemente você tem q estar no voice pra me ouvir não acha?');

		return true;
	}
}

