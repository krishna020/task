const express = require('express');
const app = express();
const router = require('express').Router();
const bnbControllers = require('../controller/bnbControllee');
const bodyParser = require('body-parser');




// getting balance

router.get('/Balance', bnbControllers.GetBalance);

// sending fund

router.post('/sendTran',bnbControllers.SendBal);





module.exports = router;