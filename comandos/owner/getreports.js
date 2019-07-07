
const { Command } = require('discord.js-commando');
const Report = require('../../models/reportDB.js');
const mongoose = require('mongoose');

module.exports = class GetReportsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'getreports',
            group: 'owner',
            memberName: 'getreports',
            description: 'Gets all unsolved reports',
            ownerOnly: true,
        });
    }

    run(message) {
        Report.find({resolved: false}, (err, reports) => {
            if(err) console.log(err);
            if(reports) {
                reports.map(report => {
                    message.say(`Report from: ${report.username}: **${report.description}**. ID: ${report._id}`);
                })
            }
        })


    }
}