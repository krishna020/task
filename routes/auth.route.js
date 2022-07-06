const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const Google_2FA_Controller = require('../controllers/2faGoogle');

router.post('/signup', authController.signUpUser);
router.post('/verify', authController.verifyEmail);
router.post('/login',authController.login);

router.post('/generateQRcode',Google_2FA_Controller.generateQRcode);
router.post ('/TOTPValid', Google_2FA_Controller.TOTPValid);

module.exports = router;
