const TronWeb = require('tronweb');
const mongoose = require('mongoose');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.shasta.trongrid.io');
const solidityNode = new HttpProvider('https://api.trongrid.io');
const eventServer = new HttpProvider('https://api.trongrid.io');
const trxSchama = require('../models/tronSchama')
const tronBalScha = require('../models/tronBalSchama');

const privKey = process.env.TRONPRIVATE_KEY;

const tronWeb = new TronWeb({
    fullNode,
    solidityNode,
    eventServer,
    privKey
});

exports.TronBalance = (req, res) => {
    const address = req.body.address;

    try {
        tronWeb.trx.getBalance(address).then( (result) =>{

            const trx = tronWeb.fromSun(result);
            const balance = `${trx} TRX`;
            // console.log(`Balance: ${trx} TRX`);   
            
            const tronBal = new tronBalScha({
                _id: new mongoose.Types.ObjectId,
                address: address,
                balance:balance
            })
              tronBal
                  .save()
                  .then((result) => {
                      res.status(200).json({
                          Message: 'Balance checked and save',
                          Details: result
                      })
                  })
        
        })

    } catch (error) {
        res.status(404).json({
            Message: 'Address is not found',
            Error: error
        })
    }
}

exports.SendTron = async(req, res) => {

    try {
        
        const { email, fromAddress, toAddress, amount } = req.body;

    const tronWeb = new TronWeb({
        fullNode,
        solidityNode,
        eventServer,
        privKey
    });

    const tradeobj = await tronWeb.transactionBuilder.sendTrx("toAddress", amount,"fromAddress",1);
    const signedtxn = await tronWeb.trx.sign(tradeobj, privKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log(receipt);

    const transaction = new trxSchama({
        _id : new mongoose.Types.ObjectId,
        email : email,
        from : fromAddress,
        to : toAddress,
        amount : amount,
        txID: receipt.txid
    })
    await transaction
    .save()
    .then((result) => {
        res.status(200).json({
            message : 'Transaction Inserted.',
            Details : result
        })
    })

    } catch (error) {
        console.log(error);
    }

}


exports.tronHistory = (req, res) => {
    const email = req.body.email;
  
      trxSchama.find(({email:email}), (err, val) => {
          if(err){
              res.status(404).json({
                  Message : 'Something went wrong.',
              })
              console.log(err);
          }
          else{
              res.status(200).json({
                  Details : val
              })
          }
          
      })
  }