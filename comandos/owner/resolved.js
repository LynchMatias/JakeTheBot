const { Command } = require('discord.js-commando');
const Report = require('../../models/reportDB.js');
const mongoose = require('mongoose');

module.exports = class ResolvedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resolved',
            group: 'owner',
            memberName: 'resolved',
            description: 'Sends a report to Jakey',
            ownerOnly: false,
            args: [
                {
                    key: 'id',
                    prompt: 'report _id',
                    type: 'string'
                }
            ]
        });
    }

    run(message, arg) {
        //console.log(arg);
        Report.findOneAndUpdate(
            {_id: arg.id}, 
            {resolved: true}, (err, updated) => {
                if(err) console.log(err);
                if(updated){
                    console.log(updated.resolved);
                }
            });

        message.say('Report marked as resolved!');
        //const owner = bot.user.get(JakeyID);
        //owner.send(`${message.author.username} just sent a report!`);

    }
}