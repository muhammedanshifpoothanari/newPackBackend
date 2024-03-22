const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    user: String,
    address: String,
    items: [],
    subTotal: Number,
    taxRate: Number,
    tax: Number,
    total: Number,
    payMod: {
        type: String,
        default: 'cod'
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDelivered: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    collection: 'orders'
});

module.exports = mongoose.model('Order',orderSchema);