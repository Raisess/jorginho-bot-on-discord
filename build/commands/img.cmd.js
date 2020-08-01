"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.img = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.img = async (message, args) => {
    const apiKey = '15769415-02ee5908b6583da7cd7ae5fdb';
    const search = args ? args.join('+').toLowerCase() : '';
    const request = await node_fetch_1.default(`https://pixabay.com/api/?key=${apiKey}&q=${search}`);
    const response = await request.json();
    const allImages = await response.hits;
    const randomImg = await allImages[Math.round(Math.random() * allImages.length - 1)];
    try {
        return message.channel.send(randomImg.webformatURL);
    }
    catch (e) {
        return message.channel.send(`Não achei imagens de: ${args ? args.join(' ') : ''}`);
    }
};
