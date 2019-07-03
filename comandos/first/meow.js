const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'meow',
            aliases: ['kitty-cat'],
            group: 'first',
            memberName: 'meow',
            description: 'Replies with a meow, kitty cat.',
            args: [
                {
                key: 'option',
                prompt: 'lo que quieras bb',
                type: 'string',
                oneOf: ['yes', 'no'],
                },
            ],
        });
    }

    run(message, {text}){
        if (message.channel.id != '596082817734148157') message.delete();
        else{
            return message.say(text);
        }
    }
};
