import { blacklist } from '../credencials.json';

export const blackListCheck = (serverName: string): boolean => {
	for (let server of blacklist) {
		if (serverName == server) {
			return true;
		}
	}

	return false;
}

