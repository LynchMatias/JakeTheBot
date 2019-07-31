const { Command } = require('discord.js-commando');

const anguilas = ['anguilas1.png', 'anguilas2.png', 'anguilas3.png', 'anguilas4.png', 'anguilas5.png', 'anguilas0.png']

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = class ReportCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anguilas',
            group: 'first',
            memberName: 'anguilas',
            description: 'Mah Spaceship!',
            ownerOnly: false,
            
        });
    }

    run(message) {
        message.say('My spaceship is full of:', {files: ['anguilas'+String(getRandomInt(5))+'.png']})
            .catch(err => console.log(err));

    }
}