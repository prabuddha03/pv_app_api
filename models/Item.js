const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    mainIngredient: {
        type: String,
        required: true
    },
    mainIngredientAmount: {
        type: String
    },
    spiceLevel: {
        type: String,
        enum: ['mild', 'medium', 'spicy']
    },
    details: {
        type: String
    },
    isSpecial: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;