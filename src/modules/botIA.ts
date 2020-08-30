import fetch from 'node-fetch';
import { uri } from '../credencials.json';

export const conversation = async (question: string): Promise<string> => {
	const request = await fetch(`${uri}/conversation/talk`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			question: question
		})
	});

	const response = await request.json();
	const text: string = await response.message;

	return text;
}

