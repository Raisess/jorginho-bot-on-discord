import { Client } from 'discord.js';
import ytdl from 'ytdl-core';

export const play = async (message: any, args: Array<string> | undefined, client: Client): Promise<boolean | any> => {
	const streamOptions = { volume: 1 };
	const voiceChannel = message.member.voice.channel;
	const connection = await voiceChannel.join();

	const music: string = args ? args[0] : '';
	const musicId: string = music.split('=')[1];

  console.log('joined channel');

	if (music == 'stop') {
		console.log('sopping music');
		voiceChannel.leave();
		connection.destroy();

		message.channel.send(`Tá bem <@${message.author.id}>, eu paro seu chato`);

		return true;
	} else {
		console.log('trying to play:', music);

  	const stream = await ytdl(music, { filter: 'audioonly', quality: 'lowest' });
		const info = await ytdl.getInfo(musicId);
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

			return true;
  	});

		dispatcher.on('error', (err: any) => {
			console.error(err);

			message.channel.send('Eii boy a música miou aqui, e agr???');

			return false;
		});
	}
}

