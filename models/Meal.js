const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    eventDayID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventDay',
        required: true
    },
    mealType: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        required: true
    },
    mealCategory: {
        type: String,
        enum: ['veg', 'non-veg', 'vegan'],
        required: true
    },
    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }],
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Meal', mealSchema);
