const { Command } = require('discord.js-commando');
const mongoose = require('mongoose');
const ReminderDB = require('../../models/reminderDB.js')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


module.exports = class KPCCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kpc',
            group: 'first',
            memberName: 'kpc',
            description: 'Imagen KPC',
            ownerOnly: false,
        });
    }

    run(message) {
        message.say('Dame la mochila o el gordito es boleta', {files: ['kpc_target.png']})
        .catch(err => console.log(err));
    }
}