const mongoose = require('mongoose');


const ethTranSchama = new mongoose.Schema({

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

const ethTransaction = new mongoose.model('all', ethTranSchama);
module.exports = ethTransaction;