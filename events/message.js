//Requiered variables for the command handler to run and work proporly
const Discord = require('discord.js')
const cooldown = new Set();
const _ = require('lodash')

module.exports = async (client, message) => { // You will need this statment at the beginning of all event files!
  if (message.channel.type == "dm") return // does not allow commands to be used in DMs
  if (message.author.bot) return // does not allow bots to use commands
  const owners = ['ownerID1', 'ownerID2'] // IDs of the Bot's owners / developers
  let prefix = '!' // This is the actual prefix used for the bot, this can be changed and configured for custom prefix if you chose
 
  // basic permissions checks so the bot can function
  if (message.content.startsWith(prefix)) {
    var permissions = new Discord.Permissions(message.channel.permissionsFor(client.user.id).bitfield)
    if (!message.guild.me.hasPermission('SEND_MESSAGES', {checkAdmin: true})) return // Ensures bot can send messages
    if (!permissions.has('SEND_MESSAGES', {checkAdmin: true})) return // Ensures bot can send messages

    if (!message.guild.me.hasPermission('EMBED_LINKS', {checkAdmin: true})) return message.channel.send('You must give me the `Embed Links` permission for all commands to work!') // Checks that bot can send embed messages
    if (!permissions.has('EMBED_LINKS', {checkAdmin: true})) return message.channel.send('You must give me the `Embed Links` permission in THIS channel for all commands to work!')// Checks that bot can send embed messages in specific channel

    const isOwner = owners.includes(message.member.id) // grabs owners / developers of the bot
    const args = message.content.slice(Object.keys(prefix).length).trim().split(/ +/g) // grabs arguments for commands
    const command = args.shift().toLowerCase() // changes commands and arguments to lowercase to run commands no matter the case

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command); // grabs commands from index.js
    if(!cmd) return // returns if theres no commands to run
    cmd.run(client,message,args,isOwner) // runs command, add any global arguments in this set of (), MAKE SURE THE ARG IS DEFINED IN THIS FILE!

    // If that command doesn't exist, silently exit and do nothing
  }}
