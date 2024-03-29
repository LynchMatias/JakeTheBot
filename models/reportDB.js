const mongoose = require('mongoose');

const reportDBSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    description: String,
    date: Object,
    resolved: Boolean,
})

module.exports = mongoose.model('Report', reportDBSchema);