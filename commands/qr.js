const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('convert-to-qr')
		.setDescription('convert text to qr !')
        .addStringOption(option => option.setName('input').setDescription('Enter a string'))
        .addStringOption(option =>option.setName('color').setDescription('Enter a hex code for color default 000000'))
        .addNumberOption(option =>option.setName('height').setDescription('Enter height of qr code default 250'))
        .addNumberOption(option =>option.setName('width').setDescription('Enter width of qr code default 250')),
	async execute(interaction) {
       
        const stringdata = interaction.options.getString('input');
        const width = interaction.options.getNumber('width') || 250;
        const height = interaction.options.getNumber('height') || 250;
       
        const color = interaction.options.getString('color') || '000000';
        console.log(stringdata);
        const data=stringdata.trim().replaceAll(' ', '+');
		await interaction.reply(`https://chart.googleapis.com/chart?cht=qr&&chco=${color}&chs=${width}x${height}&chl=${data}`);
	},
};