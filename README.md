# Discord.js Basic COmmand Handler

**This is a basic command handler for discord.js to run commands and events in their own files! Below you can find all the documentation on the command handler!**

* index.js
> Index.js is the main file you will be running to start your bot! In this file, is the main setup for the bot. It will run all of the command and event files from here. Also, for testing commands theres an event for easy tesitng without making new files!

* /events/message.js
> This is the message file. In here contains all the code to actually run the command when a user send a command messgae! 

* Events
 > To add a new event, make a new file called `<eventName>.js` in the `/events` directory. Make sure to add `module.exports = async (client, guild, user) => { // ALL code }` to your file! Feel free to pass any arguments needed in the () behind client, guild, and user.
 
 * Commands
> TO add a new command, make a new file called `<commandName>.js` in the `/commands` directory. Make sure to add `module.exports.run = async (client, message, args, isOwner => { // ALL code }` to your file! Add any arguments needed in the () following client, message, args, and isOwner!
