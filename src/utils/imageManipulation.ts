import Canvas from 'canvas';
import { MessageAttachment } from 'discord.js';

export const imageManipulation = async (member: any, image: string): Promise<void> => {
	const channel = member.guild.channels.cache.find((ch: any) => ch.name === 'geral');
	if (!channel) return;

	const serverName = member.guild.name;
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage(image);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Bem vindo ao servidor ${serverName},`, canvas.width / 2.5, canvas.height / 3.5);
	
	// Add an exclamation point here and below
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 3.5, canvas.height / 1.8);
	
	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
	
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);
	
	const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
	
	channel.send(attachment);
}

