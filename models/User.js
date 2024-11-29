const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Pre-registered details by admin
    block: {
        type: String,
    },
    userName: {
        type: String,
        required: true
    },
    flatNo: {
        type: String,
    },
    email: {
        type: String,
        sparse: true
    },
    contactNo: {
        type: String,
        sparse: true
    },
    userType: {
        type: String,
        enum: ['owner', 'tenant'],
    },
    name: {
        type: String,
    },
    userRole : {
        type: String,
        enum: ['user','moderator','admin']
    },
    
    // Authentication details
    firebaseUID: {
        type: String,
        sparse: true
    },
    authType: {
        type: String,
        enum: ['phone', 'google', 'facebook', 'apple'],
        sparse: true
    },
    verifiedEmail: {
        type: String,
        sparse: true
    },
    verifiedPhone: {
        type: String,
        sparse: true
    },
    
    // Status
    onboarded: {
        type: Boolean,
        default: false
    },
    isPreRegistered: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
