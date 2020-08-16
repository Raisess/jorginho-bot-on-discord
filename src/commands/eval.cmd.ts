import { clean } from '../utils/clean';
import { checkOwnerId } from '../utils/checkOwnerId';

export const evalCommand = (message: any, args: Array<string> | undefined): void => {
	if (checkOwnerId(message.author.id)) {
		try {
    	const code = args ? args.join(" ") : '';
    	let evaled = eval(code);
	 
   		if (typeof evaled !== "string") {
    		evaled = require("util").inspect(evaled);
			}
	 
    	return message.channel.send(clean(evaled), { code: "xl" });
  	} 	catch (err) {
    	return message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  	}
	}

	return message.channel.send(':octagonal_sign: Comando disponivel somente para programadores!!! :octagonal_sign:');
}

