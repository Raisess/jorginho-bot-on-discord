export interface MessageEngineCommand {
  created_at:  string;
  updated_at:  string;
  guild:       string;
  creator:     string;
  creator_id:  string;
  command:     string;
  message:     string;
}

interface ICount {
	message:  string;
	count:    number;
}

let counts: Array<ICount> = [];

export const messageEngine = (_message: any, messageData: MessageEngineCommand | any): string => {
	const { creator_id, message } = messageData;
	// replace words
	let customMessage: string = message.replace(/({username})/g, `<@${_message.author.id}>`)
		.replace(/({me})/g, `<@${creator_id}>`);

	let splitedCustomMessage: Array<string> = customMessage.split(' ');

	// check if a count message command
	if (splitedCustomMessage.indexOf('{count}') != -1) {
		// if not have a initialize, initialize this shit
		if (counts.length != 0) {
			for (let i = 0; i < counts.length; i++) {
				// if have a initialize update that
				if (counts[i].message == customMessage) {
					counts[i].count = counts[i].count + 1;

					// normal replace is not working when i try to replace {cout}, but i make this "gambiarra" :rage:
					splitedCustomMessage[splitedCustomMessage.indexOf('{count}')] = String(counts[i].count);
					return splitedCustomMessage.join(' ');
				}
			}

			// initilize a anothe message if the count array length != 0
			counts.push({
				message: customMessage,
				count:   1
			});

			splitedCustomMessage[splitedCustomMessage.indexOf('{count}')] = '1';
			return splitedCustomMessage.join(' ');
		} else {
			counts.push({
				message: customMessage,
				count:   1
			});

			splitedCustomMessage[splitedCustomMessage.indexOf('{count}')] = '1';
			return splitedCustomMessage.join(' ');
		}
	}

	return customMessage;
}

