const mongoose = require('mongoose');


const stockSchema = new mongoose.Schema({
    name: String,
    size: String,
    color: String,
    quantity: Number,
    category: String,
    price: Number,
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
    collection: 'stock'
});

module.exports = mongoose.model('Stock',stockSchema);