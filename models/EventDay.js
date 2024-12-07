const mongoose = require('mongoose');

const eventDaySchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    dayName: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

const EventDay = mongoose.model('EventDay', eventDaySchema);

module.exports = EventDay;