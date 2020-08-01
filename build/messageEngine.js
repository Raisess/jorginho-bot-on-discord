"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageEngine = void 0;
exports.messageEngine = (_message, messageData) => {
    const { creator_id, message } = messageData;
    const customMessage = message.replace(/({username})/g, `<@${_message.author.id}>`).replace(/({me})/g, `<@${creator_id}>`);
    return customMessage;
};
