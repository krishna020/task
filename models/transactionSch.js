const mongoose = require('mongoose');



const TranSchama = new mongoose.Schema({

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

    hash: {
        type: String
    }
})


const Transaction = new mongoose.model('all', TranSchama);
module.exports = Transaction;