const commando = require('discord.js-commando')
const Discord = require('discord.js');
const path = require('path')
const mongoose = require('mongoose');
const cron = require('node-cron');
const Reminder = require('./models/reminders.js')
const agua = 'https://cms.qz.com/wp-content/uploads/2018/12/water-filter-buying-guide-e1544721509833.jpg?quality=75&strip=all&w=3200&h=1800'

const base = 'mongodb+srv://JakeBot:m5kPk9kDejJdbjTi@cluster0-zymck.mongodb.net/Users';

mongoose.connect(base);

const bot = new commando.Client({
    commandPrefix: '!',
    unknownCommandResponse: false,
    owner: '203330869576990721'
});

module.exports = {
    getUserFromMention: function (mention) {
        if (!mention) return;

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);

            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            return bot.users.get(mention);
        }
    }
};


bot.registry
.registerDefaultTypes()
    .registerGroups([
        ['first', 'Comandos basicos'],
        ['second', 'Your Second Command Group'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'comandos'));

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('with Javascript')


    cron.schedule('00 17 * * *', () => {
        Reminder.find({}, (err, users) => {
            if(err) console.log(err);
            if(users){
            users.map(user => {
                const userObject = bot.users.get(user.userID);
                
                var water = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setTitle('Remember to drink water!')
                    .setImage(agua);

                userObject.send({embed: water})
                .then(() => console.log('sent message'))
                .catch(err => console.log(err));              
            });
            }else console.log('No hay nadie en la lista');
        },{
                sheduled: true,
                timezone: "America/Buenos_Aires",
        });
    });
});

bot.on('message', msg => {
    const music = bot.channels.get('333353428250263552');
    const waifus = bot.channels.get('308403501648707589')
    if ((msg.content.startsWith('alexa') || msg.content == '!bacon') && msg.channel != music) {
        msg.delete();
    }
    if (msg.content.startsWith('$') && msg.channel != waifus){
        msg.delete()
    }
    if (msg.content == 'bacon pancakes'){
        msg.react('🥓')
    }
});

bot.login(process.env.BOT_TOKEN);
