const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [cartItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
});

// Middleware to calculate totalAmount before saving
cartSchema.pre('save', async function (next) {
    const cart = this;
    await cart.populate('cartItems.meal');
    cart.totalAmount = cart.cartItems.reduce((total, item) => {
        return total + (item.meal.price * item.quantity);
    }, 0);

    next();
});

const FoodCart = mongoose.model('FoodCart', cartSchema);
module.exports = FoodCart;
