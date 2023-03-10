const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const employeController = require('../Controller/employeController')
const verifyToken = require('../Middleware/middleware')
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.post('/register', userController.Register);
router.post('/login', userController.Login);
router.post('/emailverify', userController.EmailVerify);
router.post('/otpverify', userController.OtpVerify);
router.post('/changepassword', userController.ChangePassword);
router.post('/createemploye', verifyToken.CheckAuthToken , employeController.EmployeRegister);
// router.get('/allemploye/:token')
router.get('/allemploye', verifyToken.CheckAuthToken, employeController.AllEmploye)
router.post('/deleteemploye', verifyToken.CheckAuthToken, employeController.DeleteEmploye)
router.post('/updateemployedetails', verifyToken.CheckAuthToken, employeController.UpdateEmployeDetails)

module.exports = router