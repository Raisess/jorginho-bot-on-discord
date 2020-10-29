import { Client, MessageEmbed } from "discord.js";
import ytdl from "ytdl-core-discord";
import yts from "yt-search";

import { colors } from "../utils/colors";
import { setActivity } from "../utils/setActivity";

interface IMusic {
	id:     string;
	url:    string;
	search: string;
}

let queue: Array<IMusic> = [];

export const play = async (message: any, args: Array<string> | undefined, client: Client): Promise<boolean | any> => {
	const music: string        = args ? args.join(" ") : "";
	let musicId: Array<string> = ["", ""];

	// play music with direct link
	if (music.startsWith("https://")) {
		if (music.split("/").indexOf("youtu.be") != -1) {
			musicId = ["cell", music.split("be/")[1]];
		} else {
			musicId = ["pc", music.split("=")[1]];
		}

		console.log("music added:", music);
		message.channel.send(`Música adicionada a fila: ${music}`);
	
		queue.push({
			id:     musicId[1],
			url:    music,
			search: music
		});

		console.log("music queue:", queue);
	} else {
		// play music with name
		if (music == "stop") {
			const voiceChannel: any = message.member.voice.channel;
			
			voiceChannel.leave();
			message.channel.send(`Tá bem <@${message.author.id}>, eu paro chatx`);

			setActivity(client, "online", "Youtube", "WATCHING");

			return true;
		} else if (music == "skip") {
			queue.shift();

			console.log("music queue:", queue);
		
			return playMusic(message, client, queue[0].url, queue[0].id);
		} else if(music == "clean") {
			queue = [];

			console.log("music queue:", queue);
			message.channel.send("A fila de músicas foi limpa!");

			return true;
		} else {
			console.log("music added:", music);
			message.channel.send(`Música adicionada a fila: ${music}`);

			const res:      any        = await yts(music);
			const videos:   Array<any> = await res.videos;
			const videoUrl: string     = await videos[0].url;

			musicId = ["pc", await videoUrl.split("=")[1]];

			queue.push({
				id:     musicId[1],
				url:    videoUrl,
				search: music
			});

			console.log("music queue:", queue);
		}
	}

	if (queue.length == 1) {
		return playMusic(message, client, queue[0].url, queue[0].id);
	}

	return true;
}

const playMusic = async (message: any, client: Client, music: string, musicId: string): Promise<boolean | any> => {	
	try {
 		// voice connection
		const voiceChannel: any = message.member.voice.channel;
		const connection:   any = await voiceChannel.join();
		const dispatcher:   any = await connection.play(await ytdl(music, { quality: "highestaudio", filter: "audioonly" }),
																										                  { volume: false, type: "opus", highWaterMark: 15 });

		// music info
		const info:         any = await ytdl.getInfo(musicId);
		const videoDetails: any = info.player_response.videoDetails;

		const musicName: string = videoDetails.title;
		const thumbnail: string = videoDetails.thumbnail.thumbnails[3].url;
		const author:    string = videoDetails.author;
		const views:     string = videoDetails.viewCount;
		const duration:  string = String((parseInt(videoDetails.lengthSeconds) / 60).toFixed(2)).replace(/\./g, ":");

		// on music starts
		dispatcher.on("start", () => {
			setActivity(client, "online", musicName, "LISTENING");

			const embed: MessageEmbed = new MessageEmbed()
				.setColor(colors[Math.round(Math.random() * colors.length) - 1])
				.setTitle(musicName)
				.setURL(music)
				.setImage(thumbnail)
				.addField("Tocando:", musicName)
				.addField("Autor:", author)
				.addField("Visualizações:", views, true)
				.addField("Duração:", duration, true);
			
			message.channel.send(embed);
		});

		// on music ends
 		dispatcher.on("finish", (end: any) => {
			queue.shift();

			if (queue.length > 0) {
				return playMusic(message, client, queue[0].url, queue[0].id);
			}

   		voiceChannel.leave();
			message.channel.send("Cabou a música, põe outra ae cria");
			setActivity(client, "online", "Youtube", "WATCHING");

			return true;
 		});

		// on music error
		dispatcher.on("error", (err: any) => {
			queue.shift();

			if (queue.length > 0) {
				return playMusic(message, client, queue[0].url, queue[0].id);
			}

   		voiceChannel.leave();
			message.channel.send("Eii boy a música miou aqui, e agr???");
			message.channel.send(err.toString(), { code: "xl" });
			setActivity(client, "online", "Youtube", "WATCHING");

			return false;
		});
	} catch (e) {
		console.error(e);
		message.channel.send(e.message, { code: "xl" });

		return true;
	}
}

