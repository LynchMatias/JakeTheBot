const mongoose = require('mongoose');
const discord = require('discord.js');

const reminderDBSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reminder: Object,
    reminderString: String,
    frecuencia: Number,
})

module.exports = mongoose.model('Reminders', reminderDBSchema);