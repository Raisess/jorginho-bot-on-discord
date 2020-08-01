"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
exports.server = (message) => {
    return message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
};
