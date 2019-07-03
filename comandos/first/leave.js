const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command{
    constructor(client){
        super(client, {
            name: 'leave',
            group: 'first',
            memberName: 'leave',
            description: 'Sale del canal de voz',
        })
    }

    run(message){
        try{
            message.member.voiceChannel.leave()
        }catch(err){
            message.say("Error")
        }
    }
}