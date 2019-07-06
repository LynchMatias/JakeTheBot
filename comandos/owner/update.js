const { Command } = require('discord.js-commando');
const bot = require('../../index.js');
const Discord = require('discord.js');


module.exports = class Estudiar extends Command {
    constructor(client) {
        super(client, {
            name: 'update',
            group: 'owner',
            memberName: 'update',
            description: '',
            ownerOnly: true,
        });
    }

    run(message) {
        message.say({

            embed: {
                title: "Update v0.2",
                description: "Version 0.2 is out! Notable changes:",
                color: 9068235,
                author: {
                    name: "Water Bot "
                },
                fields: [
                    {
                        name: "Reminders",
                        value: "New command: `!reminder <type>` to replace `!water`. The database has been reset. Use `!noreminder <type>` to leave the database."
                    },
                    {
                        name: "Reports",
                        value: "New command: `!report <your report>` to report bugs / stuff you would like different."
                    },
                    {
                        name: "TODO",
                        value: "- Make reminder times customizable \n"
                    }
                ]
            }
        })

    }
}