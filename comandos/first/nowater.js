const { Command } = require('discord.js-commando');
const Reminder = require('C:/Users/matia/Desktop/JakeTheBot/models/reminders.js')

module.exports = class WaterNoReminder extends Command {
    constructor(client) {
        super(client, {
            name: 'nowater',
            group: 'first',
            memberName: 'nowater',
            description: 'Saca de la lista de reminders',
            ownerOnly: false,
        });
    }

    async run(message) {

        Reminder.findOneAndDelete({
            username: message.author.username,
            userID: message.author.id
        }, (err, user) => {
            if (err) console.log(err);
            if (!user) {
                message.reply('No estas en la base de datos. Para entrar, !water');
            } else{
             message.reply('Removido de la base de datos!');
             console.log(user);
            }
        });

    }
};