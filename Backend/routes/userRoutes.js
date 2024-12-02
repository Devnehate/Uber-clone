const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userControlller.js')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password musst be at least 6 characters long')
],
    userController.registerUser
)



module.exports = router;