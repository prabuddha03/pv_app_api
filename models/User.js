const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        minlength: 8,
    },
    coins:{
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        sparse: true
    },
    contactNo: {
        type: Number,
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
        enum: ['user','moderator','admin'],
        default: 'user',
    },   
    // Status
    onboarded: {
        type: Boolean,
        default: false
    },
    passCheck: {
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    this.password = await bcrypt.hash(this.password, 12); //salt of 12 rounds
    next();
  });
  
  userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  

module.exports = mongoose.model('User', userSchema);
