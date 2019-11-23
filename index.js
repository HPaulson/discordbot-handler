/* Basic variables needed for discord.js and command handler to run*/
const Discord = require('discord.js')
const client = new Discord.Client({ disableEveryone: true })
const fs = require('fs')
const Enmap = require("enmap");
const owners = ['ownerID1', 'ownerID2']

/*This event is used for testing new commands, without making a command file. Simple enter your code in the 'test' case, and
use command 'test' to run the code!*/
client.on('message', async message => {
  let prefix = '!' // If you later chose to add custom prefix, this one will still be used for the testing command
  if (message.channel.type == "dm") return
  if (!message.content.startsWith(prefix) || message.author.bot) return
  
  

  const isOwner = owners.includes(message.member.id)
  const args = message.content.slice(Object.keys(prefix).length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  // Grab the command data from the client.commands Enmap
  switch (command) {
    case 'test':
  }
})
/*End testing event*/

// This is for the events handler. Add all event files in a folder called /events and name each file <eventName>.js
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

// This is for the command handler. Add all command files in a folder called /commands and name each file <commandName>.js
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    props.help.aliases.forEach(alias => {
      client.commands.set(alias, props)
    })
  });
});

client.login("TOKEN");
