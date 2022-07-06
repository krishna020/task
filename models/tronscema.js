const mongoose = require('mongoose');

const trxSchama =  new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId
    },

    email: {
        type: String,   
    },

    fromAddress: {
        type: String
    },

    toAddress: {
        type: String
    },

    amount: {
        type: String
    },

    txID: {
        type: String
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Transaction = new mongoose.model('trx', trxSchama);
module.exports = Transaction;