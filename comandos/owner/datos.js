const { Command } = require('discord.js-commando');
//const mongoose = require('mongoose');
const ReminderDB = require('../../models/reminderDB.js')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


module.exports = class DatosCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'datos',
            group: 'first',
            memberName: 'datos',
            description: 'Informacion de la base de datos',
            ownerOnly: true,
        });
    }

    run(message){
        ReminderDB.find({}, (err, users) => {
            if(err) console.log(err);
            if(users) {
                users.map(user => {
                    message.say(`User: **${user.username}** with reminder **${user.reminderString}**.`);
                });
            }
        });
    }
}
