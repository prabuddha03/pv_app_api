const mongoose = require('mongoose');

const eventDaySchema = new mongoose.Schema({
    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    dayName: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('EventDay', eventDaySchema);