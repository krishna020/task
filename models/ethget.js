const mongoose = require('mongoose');

const ethBalSach = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },

    address: {
        type: String
    },

    balance: {
        type: String
    }


})

const ethBalance = new mongoose.model('ethbalance', ethBalSach);
module.exports = ethBalance;