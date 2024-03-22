const mongoose = require('mongoose');


const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    assetId: String,
    isBlocked: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
}, {
    collection: 'banners'
});

module.exports = mongoose.model('Banners',bannerSchema);