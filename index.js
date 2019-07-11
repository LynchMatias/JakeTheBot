const commando = require('discord.js-commando')
const Discord = require('discord.js');
const path = require('path')
const mongoose = require('mongoose');
const cron = require('node-cron');
const ReminderDB = require('./models/reminderDB.js');
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true});

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
        ['first', 'Your First Command Group'],
        ['owner', 'Owner only commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'comandos'));

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('YouTube', {type: 'WATCHING'});



    cron.schedule('00 17 * * *', () => {
        ReminderDB.find({}, (err, users) => {
            if(err) console.log(err);
            if(users){
            users.map(user => {
                const userObject = bot.users.get(user.userID);
                
                var sendEmbed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.reminder.title)
                    .setImage(user.reminder.img);

                userObject.send({embed: sendEmbed})
                .then(() => console.log('sent message index'))
                .catch(err => console.log(err));              
            });
            }else console.log('No hay nadie en la lista');
        },{
                sheduled: true,
                timezone: "America/Argentina/Buenos_Aires",
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

//bot.login(TOKEN);
bot.login(process.env.BOT_TOKEN);
