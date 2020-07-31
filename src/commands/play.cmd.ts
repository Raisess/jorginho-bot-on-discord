import { Client } from 'discord.js';
import ytdl from 'ytdl-core';

export const play = async (message: any, args: Array<string> | undefined, client: Client): Promise<boolean | any> => {
	const streamOptions = { volume: 1 };
	const voiceChannel = message.member.voice.channel;
	
	const connection = await voiceChannel.join();
	const music = args ? args[0] : '';

  console.log('joined channel');
	console.log('trying to play:', music);

  const stream = await ytdl(music, { filter: 'audioonly', quality: 'lowestaudio' });
  const dispatcher = connection.play(stream, streamOptions);

	dispatcher.on('start', () => {
		console.log(music, 'is now playing!');

		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'Youtube',
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

