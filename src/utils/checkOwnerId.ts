import { owner_id } from '../credencials.json';

export const checkOwnerId = (id: string): boolean => {
	for (let owner of owner_id) {
		if (id == owner) {
			return true;
		}
	}

	return false;
}
