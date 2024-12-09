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

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    eventDayId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventDay',
        required: true
    },
    cartItems: [cartItemSchema], // Reusing the structure of cart items
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['qr', 'neft', 'cash'],
        default: 'qr'
    },
    status: {
        type: String,
        enum: ['booked', 'paid', 'cancelled'],
        default: 'booked'
    },
    paymentID: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

bookingSchema.index({ userId: 1, eventDayId: 1 }, { unique: true });

const FoodBooking = mongoose.model('FoodBooking', bookingSchema);
module.exports = FoodBooking;
