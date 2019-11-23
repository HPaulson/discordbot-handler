/* Basic variables needed for discord.js and command handler to run*/
const Discord = require('discord.js')
const client = new Discord.Client({ disableEveryone: true }) // Set this to `false` to allow your bot to ping @everyone
const fs = require('fs')
const Enmap = require("enmap");
const owners = ['ownerID1', 'ownerID2'] // make sure to fill these with the bot owner's / developer's IDs!

/*This event is used for testing new commands, without making a command file. Simple enter your code in the 'test' case, and
use command 'test' to run the code!*/
client.on('message', async message => {
  let prefix = '!' // If you later chose to add custom prefix, this one will still be used for the testing command
  if (message.channel.type == "dm") return // Makes it so commmands cant be used in DMs
  if (!message.content.startsWith(prefix) || message.author.bot) return // Does not allow bots to use commands, and ignores messages without the prefix
  const isOwner = owners.includes(message.member.id) // sets the owners / developers of the bot from the variable on line 6, `isOwner` is used as an argument in command files later!
  const args = message.content.slice(Object.keys(prefix).length).trim().split(/ +/g) // Grabs command arguments
  const command = args.shift().toLowerCase() // sets the command to lowercase, so you can use any caps/lowercase in commands

  // Grab the command data from the client.commands Enmap
  switch (command) {
    case 'test':
      // Code to Test here, this code should be AFTER the `module.exports.run` function, and BEFORE the `module.exports.help` object.
  }
})
/*End testing event*/

// This is for the events handler. Add all event files in a folder called /events and name each file <eventName>.js
fs.readdir("./events/", (err, files) => { // grabs files in `./events` directory
  if (err) return console.error(err); // logs any errors
  files.forEach(file => { 
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  }); // loads every file in the directory
});


// This is for the command handler. Add all command files in a folder called /commands and name each file <commandName>.js
client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => { // grabs files in `./commands` directory
  if (err) return console.error(err); // logs any errors 
  files.forEach(file => {
    if (!file.endsWith(".js")) return; // ignores any non-javascript files
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`); // logs command name when it's loaded
    client.commands.set(commandName, props);
    props.help.aliases.forEach(alias => {
      client.commands.set(alias, props) // loads command aliases
    })
  }); // loads every file in the directory
});

client.login("TOKEN"); // Make sure to fill this with your clients token, or a .env file to be more secure!
