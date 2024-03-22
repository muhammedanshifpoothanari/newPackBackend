const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    mobile: {
        type: Number,
        unique: true,
        required: true
    },
    assetId: String,

    address: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        unique: true,
    },
    otp: String,
    otpExpire: Date,
    cart: [],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
}, {
    collection: 'users'
});


module.exports = mongoose.model('User',userSchema);