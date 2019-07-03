const mongoose = require('mongoose');
const discord = require('discord.js');

const reminderUnoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reminders: Object,
    frecuencia: Number,
})

module.exports = mongoose.model('Reminder Mergeado', reminderUnoSchema);