const { Command } = require('discord.js-commando');
const mongoose = require('mongoose');
const ReminderDB = require('../../models/reminderDB.js');
const cron = require('node-cron');
const Discord = require('discord.js');
const agua = 'https://cms.qz.com/wp-content/uploads/2018/12/water-filter-buying-guide-e1544721509833.jpg?quality=75&strip=all&w=3200&h=1800';
const aire = 'https://www.ecestaticos.com/imagestatic/clipping/95b/dd3/95bdd37c302d17d432e84558f00d5652/la-manera-correcta-de-respirar-como-tomar-aire-a-pleno-pulmon.jpg?mtime=1427800583';


function waterObject(){
    this.img = agua;
    this.title = "Remember to stay hydrated!"
}

function outsideObject(){
    this.img = aire;
    this.title = "Remember to go outside!"
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function reacciono(message, typeObject, typeText){

    console.log(typeObject);
    const user = new ReminderDB({ //Sino, creo uno nuevo
        _id: mongoose.Types.ObjectId(),
        username: message.author.username,
        userID: message.author.id,
        reminder: typeObject,
        reminderString: typeText,
        frecuencia: 1,
    });
    user.save()
        .then(output => console.log(output))
        .catch(err => console.log(err));

    message.author.send('Added!');

};


function crear_schedule(message, typeString){

    ReminderDB.findOne({
        username: message.author.username,
        userID: message.author.id,
        reminderString: typeString,
    }, (err, user) => {
        if(err) console.log(err);
        if(user){
             cron.schedule("00 17 * * *", () => {
                var sendEmbed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.reminder.title)
                    .setImage(user.reminder.img);

                message.author.send({ embed: sendEmbed })
                    .then(() => console.log('sent message'))
                    .catch(err => console.log(err));
             }, {
                     sheduled: true,
                     timezone: "America/Argentina/Buenos_Aires",
                 });   
        }
    })
}

function waterReminder(message, arg){
    ReminderDB.findOne({                    //Busco si la persona ya tiene ESE TIPO DE REMINDER puesto
        username: message.author.username,
        userID: message.author.id,
        reminderString: 'water',           
    }, (err, user) => {
        if (err) console.log(err);
            if (!user){  
            message.author.send({
                embed: {
                    title: 'To be reminded to drink water, react to this message',
                    image: { url: agua }
                }
            })
                .then(msg => {
                    const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                    msg.react('✅')
                    const collector = msg.createReactionCollector(filter, { time: 15000 });
                    collector.on('collect', () => reacciono(message, new waterObject(), 'water'));
                });
        } else {
            message.reply('Youre already being reminded of this! To leave type ```!noreminder water```');
        }
    });

    crear_schedule(message, arg.option);
    
}

function outsideReminder(message, arg) {

    ReminderDB.findOne({                   
        username: message.author.username,
        userID: message.author.id,
        reminderString: 'outside',
    }, (err, user) => {
        if (err) console.log(err);
            if (!user){
            message.author.send({
                embed: {
                    title: 'To be reminded to go outside, react to this message',
                    image: { url: aire }
                }
            })
                .then(msg => {
                    const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                    msg.react('✅')
                    const collector = msg.createReactionCollector(filter, { time: 15000 });
                    collector.on('collect', () => reacciono(message, new outsideObject(), 'outside'));
                });
        } else {
            message.reply('Youre already being reminded of this! To leave type ```!noreminder outside```');
        }
    });

    crear_schedule(message, arg.option);
}


module.exports = class ReminderMaster extends Command {
    constructor(client) {
        super(client, {
            name: 'reminder',
            group: 'first',
            memberName: 'reminder',
            description: 'Starts reminder',
            ownerOnly: false,
            args: [
                {
                    key: 'option',
                    prompt: 'reminder you want to set up',
                    type: 'string',
                    oneOf: ['outside', 'water'],
                },
            ],
        });
    }

    run(message, arg){
        if(message.channel.type != 'dm'){
            message.say('Let me slide into your DMs to set this up');
        }
        console.log(arg);

        

        if(arg.option == 'water') waterReminder(message, arg);
        if(arg.option == 'outside') outsideReminder(message, arg);
        
    }
};
