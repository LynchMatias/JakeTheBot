const { Command } = require('discord.js-commando');
//const Discord = require('discord.js')

module.exports = class WTFCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wtf',
            group: 'first',
            memberName: 'wtf',
            description: 'wtf',
            ownerOnly: false,
        });
    }

    run(message) {
        message.say({

            embed: {
                title: "wtf",
                color: 9068235,
                image: {
                    url: 'https://cdn.discordapp.com/attachments/596020456826339329/597531471108112406/wtf.jpg'
                },
                footer: {
                    text: "wtf"
                }
            }
        })

    }   
}