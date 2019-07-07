const { Command } = require('discord.js-commando');
const Report = require('../../models/reportDB.js');
const mongoose = require('mongoose');

module.exports = class ReportCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'report',
            group: 'first',
            memberName: 'report',
            description: 'Sends a report to Jakey',
            ownerOnly: false,
            args: [
                {
                key: 'description',
                prompt: 'You need to type something',
                type: 'string'
            }
        ]
        });
    }

    run(message, arg) {
        console.log(arg);
        const date = new Date();
        const report = new Report({
            _id: mongoose.Types.ObjectId(),
            username: message.author.username,
            userID: message.author.id,
            description: arg.description,
            date: message.createdAt,
            resolved: false,
        })
        report.save()
        .then(output => console.log(output))
        .catch(err => console.log(err));

        message.say('Thanks for the report!');
        //const owner = bot.user.get(JakeyID);
        //owner.send(`${message.author.username} just sent a report!`);

    }
}