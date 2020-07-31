import { Client } from 'discord.js';
import ytdl from 'ytdl-core';
import yts from 'yt-search';

export const play = async (message: any, args: Array<string> | undefined, client: Client): Promise<boolean | any> => {
	const voiceChannel = message.member.voice.channel;

	const music: string = args ? args.join(' ') : '';
	let musicId: Array<string>;

	console.log('joined channel');

	if (music.startsWith('https://')) {
		if (music.split('/').indexOf('youtu.be') != -1) {
			musicId = ['cell', music.split('be/')[1]];
		} else {
			musicId = ['pc', music.split('=')[1]];
		}

		console.log('trying to play:', music, 'link type:', musicId[0]);

		return playMusic(message, client, music, musicId, voiceChannel);
	} else {
		if (music == 'stop') {
			console.log('sopping music');
			voiceChannel.leave();

			message.channel.send(`Tá bem <@${message.author.id}>, eu paro chatx`);

			return true;
		} else {
			yts(music, async (err: any, res: any): Promise<boolean> => {
				const videos: Array<any> = await res.videos;
				const videoUrl: string = await videos[0].url;

				musicId = ['pc', await videoUrl.split('=')[1]];

				console.log('trying to play:', videoUrl, 'link type:', musicId[0]);

				return playMusic(message, client, videoUrl, musicId, voiceChannel);
			});
		}
	}
}

const playMusic = async (message: any, client: Client, music: string, musicId: Array<string>, voiceChannel: any): Promise<boolean | any> => {	
	const streamOptions = { volume: 1 };
	const stream = await ytdl(music, { filter: 'audioonly', quality: 'lowestaudio' });
	const info = await ytdl.getInfo(musicId[1]);
 	
	const connection = await voiceChannel.join();
	const dispatcher = connection.play(stream, streamOptions);

	const musicName: string = info.player_response.videoDetails.title;

	dispatcher.on('start', () => {
		console.log(musicName, 'is now playing!');
		// console.log('info:', info.player_response.videoDetails);

		client.user.setPresence({
			status: 'online',
			activity: {
				name: musicName,
				type: 'LISTENING'
			}
		});
	});

 	dispatcher.on('finish', (end: any) => {
   	console.log('left channel');
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

	dispatcher.on('error', (err: any) => {
		console.error(err);

		message.channel.send('Eii boy a música miou aqui, e agr???');

		return false;
	});
}

