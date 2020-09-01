import { Client } from 'discord.js';

export const setActivity = (client: Client, status: string, name: string, type: string): boolean => {
	// setting bot activity
	client.user.setPresence({
	  status: status,
	  activity: {
	    name: name,
	    type: type // PLAYING: WATCHING: LISTENING: STREAMING:
	  }
	});

	return true;
}

