const mongoose = require('mongoose');

const tronBalScha = new mongoose.Schema({
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

const tronBalance = new mongoose.model('tronbalance', tronBalScha);
module.exports = tronBalance;