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
        if (message.channel.id != '596082817734148157') message.delete(); //Solo en #water-bot
        else{
            const user = index.getUserFromMention(tag); //Busco el user del @
            if(!user){
                return message.say('Error')
            }
            
            var foto = new Discord.RichEmbed()  //Embed con nombre + foto
                .setColor('#0099ff')
                .setTitle(user.username)
                .setImage(user.displayAvatarURL)
            message.channel.send({embed: foto})
        }
    }
};
