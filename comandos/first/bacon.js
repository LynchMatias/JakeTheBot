// Play streams using ytdl-core
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

const { Command } = require('discord.js-commando');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


module.exports = class BaconCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bacon',
            group: 'first',
            memberName: 'bacon',
            description: 'Plays Bacon Pancakes',
        });
    }
    
    async run(message){ 
        if (message.channel.id != '333353428250263552'){ //Solo en #music
            message.delete();
            return;
        }
        const canal = message.member.voiceChannel
        canal.join()
        .then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=cUYSGojUuAU', { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
        })
        .catch(console.error);
        await sleep(45000)
        canal.leave()
    }
};