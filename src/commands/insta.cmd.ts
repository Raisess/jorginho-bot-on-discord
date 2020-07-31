import ig from 'instagram-scraping';

export const insta = (message: any, args: Array<string> | undefined): void => {
	const flag: string = args ? args[0] : '';
	const username: string = args ? args[1] : '';

	ig.scrapeUserPage(username).then((res: any) => {
		// console.log(res);
		const profilePic: string = res.user.profile_pic_url_hd;
		const medias: Array<any> = res.medias;

		if (flag == 'pfp') {
			return message.channel.send(profilePic);
		} else if (flag == 'midia') {
			for (let media of medias) {
				message.channel.send(media.display_url);
			}

			return message.channel.send(`Total de fotos: ${res.total}`);
		} else {
			return message.channel.send(`Flag ${flag} invalida, tente "pfb" ou "midia"`);
		}
	}).catch(() => {
		return message.channel.send('Foi mal man a conta dx desgraçadx é privada...');
	});
}

