// This is an example command file!
const Discord = require('discord.js')

module.exports.run = async (client, message, args, isOwner) => { //THis statment is REQUIRED in ALL command files for it to run!
    // All command code will go here. Notice theres no events, no if statments for message content, just the code for the command itself.
    var m = await message.channel.send('Ping?')
    return m.edit(`:ping_pong: | Bot's Latency Is ${m.createdTimestamp - message.createdTimestamp}ms`) // Some basic example ping code
}

// This is REQUIRED at the end of your command file. In the aliases array, feel free to add any aliases for the command!
module.exports.help = {
    aliases: [],
}
