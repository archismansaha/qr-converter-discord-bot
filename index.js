require('dotenv').config();
const fs = require('node:fs');// fs is Node's native file system module. Collection is a class that extends JavaScript's native Map class, and includes more extensive, useful functionality.
const { Client, Collection, Intents } = require('discord.js');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


const clientId = process.env.Client_id;
const guildId = process.env.Server_id;
const token = process.env.TOKEN;











client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));//This next step is how to dynamically retrieve your command files. The fs.readdirSync() method will return an array of all the file names in a directory, e.g. ['ping.js', 'beep.js']. To ensure only command files get returned, use Array.filter() to leave out any non-JavaScript files from the array. With that array, loop over it and dynamically set your commands to the client.commands Collection.
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});
client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});




// Login to Discord with your client's token
client.login(process.env.TOKEN);