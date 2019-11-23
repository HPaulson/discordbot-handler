const Discord = require('discord.js')
const cooldown = new Set();
const _ = require('lodash')

module.exports = async (client, message) => { // You will need this statment at the beginning of all event files!
  if (message.channel.type == "dm") return
  if (message.author.bot) return
  const owners = ['ownerID1', 'ownerID2'] // IDs of the Bot's owners / developers
  let prefix = '!' // This is the actual prefix used for the bot, this can be changed and configured for custom prefix if you chose
 
  // basic permissions checks so the bot can function
  if (message.content.startsWith(prefix)) {
    var permissions = new Discord.Permissions(message.channel.permissionsFor(client.user.id).bitfield)
    if (!message.guild.me.hasPermission('SEND_MESSAGES', {checkAdmin: true})) return
    if (!permissions.has('SEND_MESSAGES', {checkAdmin: true})) return

    if (!message.guild.me.hasPermission('EMBED_LINKS', {checkAdmin: true})) return message.channel.send('You must give me the `Embed Links` permission for all commands to work!')
    if (!permissions.has('EMBED_LINKS', {checkAdmin: true})) return message.channel.send('You must give me the `Embed Links` permission in THIS channel for all commands to work!')

    const isOwner = owners.includes(message.member.id)
    const args = message.content.slice(Object.keys(prefix).length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
    if(!cmd) return
    cmd.run(client,message,args,isOwner)

    // If that command doesn't exist, silently exit and do nothing
  }}
