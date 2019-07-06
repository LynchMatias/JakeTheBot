const { Command } = require('discord.js-commando');
const ReminderDB = require('../../models/reminderDB.js')

module.exports = class NoReminderReminder extends Command {
    constructor(client) {
        super(client, {
            name: 'noreminder',
            group: 'first',
            memberName: 'noreminder',
            description: 'Removes you from the reminder database',
            ownerOnly: false,
            args: [
                {
                    key: 'option',
                    prompt: 'reminder you want to leave',
                    type: 'string',
                    oneOf: ['outside', 'water'],
                },
            ],
        });
    }

    async run(message, arg) {

        ReminderDB.findOneAndDelete({
            username: message.author.username,
            userID: message.author.id,
            reminderString: arg.option,
        }, (err, user) => {
            if (err) console.log(err);
            if (!user) {
                message.reply('Youre not in the database. To be reminded of this, type' + ` !reminder ${arg.option}`);
            } else{
             message.reply('You have been removed from the database!');
             console.log(user);
            }
        });

    }
};