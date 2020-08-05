import { Client } from 'discord.js';

export declare type Activity = 'WATCHING' | 'PLAYING' | 'LISTENING' | 'STREAMING' | undefined;
export declare type Status = 'online' | 'idle' | 'invisible' | 'dnd' | undefined;

export const setActivity = (client: Client, status: Status, name: string, type: Activity): boolean => {
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

