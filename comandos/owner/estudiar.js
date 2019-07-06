const julia = 293840382725324801;
const fede = 219274946373877770;
const {Command} = require('discord.js-commando');
const bot = require('../../index.js');


module.exports = class Estudiar extends Command {
    constructor(client) {
        super(client, {
            name: 'estudiar',
            group: 'owner',
            memberName: 'estudiar',
            description: 'Anda a estudiar',
            ownerOnly: true,
        });
    }

    run(message){
        message.say('hola');

    }
}