export interface MessageEngineCommand {
  created_at:  string;
  updated_at:  string;
  guild:       string;
  creator:     string;
  creator_id:  string;
  command:     string;
  message:     string;
}

export const messageEngine = (_message: any, messageData: MessageEngineCommand): string => {
	const { creator_id, message } = messageData;
	// replace words
	let customMessage: string = message.replace(/\{username}/g, `<@${_message.author.id}>`);
	customMessage = message.replace(/\{me}/g, `<@${creator_id}>`);

	return customMessage;
}

