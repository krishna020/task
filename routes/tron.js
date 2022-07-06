const express = require('express');
const router = require('express').Router();
const ethController = require('../controller/ethController');



router.get('/Balance', ethController.Balance);
router.post('/sendETH', ethController.sendETH);



module.exports = router;