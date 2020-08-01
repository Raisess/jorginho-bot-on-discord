"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insta = void 0;
const instagram_scraping_1 = __importDefault(require("instagram-scraping"));
exports.insta = (message, args) => {
    const flag = args ? args[0] : '';
    const username = args ? args[1] : '';
    instagram_scraping_1.default.scrapeUserPage(username).then((res) => {
        const profilePic = res.user.profile_pic_url_hd;
        const medias = res.medias;
        if (flag == 'pfp') {
            return message.channel.send(profilePic);
        }
        else if (flag == 'midia') {
            for (let media of medias) {
                message.channel.send(media.display_url);
            }
            return message.channel.send(`Total de fotos: ${res.total}`);
        }
        else {
            return message.channel.send(`Flag ${flag} invalida, tente "pfb" ou "midia"`);
        }
    }).catch(() => {
        return message.channel.send('Foi mal man a conta dx desgraçadx é privada...');
    });
};
