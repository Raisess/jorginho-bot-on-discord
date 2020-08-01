"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voice = void 0;
exports.voice = async (message) => {
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        return true;
    }
    return false;
};
