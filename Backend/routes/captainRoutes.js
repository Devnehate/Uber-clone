const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captainController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 3 }).withMessage('password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('capacity must be at least 1 characters long'),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage('Invalid vehical Type'),
],
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:3}).withMessage('password must be at least 3 characters long')
],
    captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain ,captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;