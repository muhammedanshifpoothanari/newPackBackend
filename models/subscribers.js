const mongoose = require('mongoose');


const subscribeSchema = new mongoose.Schema({
    mobile: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
}, {
    collection: 'subscribers'
});

module.exports = mongoose.model('Subscribers',subscribeSchema);