export const voice = async (message: any): Promise<boolean> => {
	if (message.member.voice.channel) {
		const connection = await message.member.voice.channel.join();

		return true;
	}

	return false;
}

