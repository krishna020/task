const express = require('express');
const mongoose = require('mongoose');
const Web3 = require('web3');
const ethTranSchama = require('../models/ethSchama');
const Accounts = require('web3-eth-accounts');
const web3 = new Web3('https://ropsten.infura.io/v3/3bfb9c601a04448bb47720f088d18f33');



exports.ethBalance = (req, res) => {
    const address = req.body.address;

    web3.eth.getBalance(address).then((Bal) => {

        const balance = web3.utils.fromWei(Bal) + ' ETH'

        const ethBal = new ethBalSach({
            _id: new mongoose.Types.ObjectId,
            address: address,
            balance:balance
        })
         ethBal
        .save()
        .then((result) => {
            res.status(200).json({
                Message: 'Balance checked and save',
                Details: result
            })
        })

    }).catch((err) => {
        console.log(err);
    })
}


exports.sendETH = async(req, res) => {
    
    const{email, fromAddress, toAddress, amount} = req.body;
    const privKey = process.env.PRIVATE_KEY;
    console.log(email, fromAddress, toAddress, amount, privKey);

    const ethTransaction = await web3.eth.accounts.signTransaction({
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(amount.toString(), "ether"),
        gas: 21000
    }, privKey)

    const sendether = await web3.eth.sendSignedTransaction(ethTransaction.rawTransaction);
    console.log('Hash:', sendether.transactionHash);
    const TransactionHash = sendether.transactionHash;

    if(TransactionHash){
        const transaction = new ethTranSchama({
            _id: new mongoose.Types.ObjectId,
            email: email,
            fromAddress: fromAddress,
            toAddress: toAddress,
            amount: amount,
            hash: TransactionHash
        })
        await transaction
        .save()
        .then((result) => {
            res.status(200).json({
                message : 'Transaction Inserted.',
                Details : result
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    

}

    


