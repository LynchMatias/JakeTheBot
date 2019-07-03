const {Command} = require('discord.js-commando');
const mongoose = require('mongoose');
const Reminder = require('C:/Users/matia/Desktop/JakeTheBot/models/reminders.js')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


module.exports = class WaterReminder extends Command {
    constructor(client) {
        super(client, {
            name: 'water',
            group: 'first',
            memberName: 'water',
            description: 'Starts reminder',
            ownerOnly: false,
        });
    }

    async run(message) {

        Reminder.findOne({
            username: message.author.username,
            userID: message.author.id
        }, (err, user) => {
            if (err) console.log(err);
            if (!user){
                const user = new Reminder({
                    _id: mongoose.Types.ObjectId(),
                    username: message.author.username,
                    userID: message.author.id,
                    reminders: {},
                    frecuencia: 1,
                });

                user.save()
                    .then(output => console.log(output))
                    .catch(err => console.log(err));

                message.author.send('Agregado a la base de datos!');
                return;
                
            } else message.reply('Ya estas en la base de datos! Para salir, !nowater');
        });
        
    }
};