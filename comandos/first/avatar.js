const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const index = require('../../index.js');


module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            group: 'first',
            memberName: 'avatar',
            description: 'Busca la foto de alguien',
            args: [
                {
                    key: 'tag',
                    prompt: 'Please tag someone to get their avatar',
                    type: 'string',
                }
            ]
        })
    }

    run(message, {tag}) {
        const user = index.getUserFromMention(tag);
        if(!user){
            return message.say('Error')
        }
        
        var foto = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .setImage(user.displayAvatarURL)
        message.channel.send({embed: foto})
    }
};
