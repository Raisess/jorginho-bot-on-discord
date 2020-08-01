"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const yt_search_1 = __importDefault(require("yt-search"));
exports.play = async (message, args, client) => {
    const voiceChannel = message.member.voice.channel;
    const music = args ? args.join(' ') : '';
    let musicId;
    if (music != 'stop') {
        message.channel.send(`Calma tô caçando aqui essa música: ${music}...`);
    }
    if (music.startsWith('https://')) {
        if (music.split('/').indexOf('youtu.be') != -1) {
            musicId = ['cell', music.split('be/')[1]];
        }
        else {
            musicId = ['pc', music.split('=')[1]];
        }
        return playMusic(message, client, music, musicId, voiceChannel);
    }
    else {
        if (music == 'stop') {
            voiceChannel.leave();
            message.channel.send(`Tá bem <@${message.author.id}>, eu paro chatx`);
            return true;
        }
        else {
            yt_search_1.default(music, async (err, res) => {
                const videos = await res.videos;
                const videoUrl = await videos[0].url;
                musicId = ['pc', await videoUrl.split('=')[1]];
                return playMusic(message, client, videoUrl, musicId, voiceChannel);
            });
        }
    }
};
const playMusic = async (message, client, music, musicId, voiceChannel) => {
    const streamOptions = { volume: 1 };
    const stream = await ytdl_core_1.default(music, { filter: 'audioonly', quality: 'highestaudio' });
    const info = await ytdl_core_1.default.getInfo(musicId[1]);
    const connection = await voiceChannel.join();
    const dispatcher = connection.play(stream, streamOptions);
    const musicName = info.player_response.videoDetails.title;
    const thumbnail = info.player_response.videoDetails.thumbnail.thumbnails[3].url;
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
    dispatcher.on('finish', (end) => {
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
    dispatcher.on('error', (err) => {
        message.channel.send('Eii boy a música miou aqui, e agr???');
        return false;
    });
};
