const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/register', userController.Register);
router.post('/login', userController.Login);
router.post('/emailverify', userController.EmailVerify);
router.post('/otpverify', userController.OtpVerify);
router.post('/changepassword', userController.ChangePassword);

module.exports = router