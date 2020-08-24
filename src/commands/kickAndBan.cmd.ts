import { checkOwnerId } from '../utils/checkOwnerId';

export const kick = (message: any): void => {
	const authorId: string = message.author.id;
	const user:     any    = message.mentions.users.first();

	if (checkOwnerId(authorId)) {
		if (user) {
			const member: any = message.guild.member(user);

			if (member) {
				return member.kick()
		  	  .then(() => message.channel.send(`${user.tag} foi kickado do servidor! :rage:`));
			}
		}
	}

	return message.channel.send(`<@${authorId}> vc n tem permissão para usar esse comando... :stuck_out_tongue_closed_eyes:`);
}

export const ban = (message: any): void => {
	const authorId: string = message.author.id;
	const user:     any    = message.mentions.users.first();

	if (checkOwnerId(authorId)) {
		if (user) {
			const member: any = message.guild.member(user);

			if (member) {
				return member.ban()
		  	  .then(() => message.channel.send(`${user.tag} foi banido do servidor!!! :rage:`));
			}
		}
	}

	return message.channel.send(`<@${authorId}> vc n tem permissão para usar esse comando... :stuck_out_tongue_closed_eyes:`);
}

