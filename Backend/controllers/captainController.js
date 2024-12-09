const { validationResult } = require('express-validator');
const captainModel = require('../models/captainModel.js');
const captainService = require('../services/captainServices.js');
const blackListTokenModel = require('../models/blackListTokenModel.js');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    const { fullname, email, password, vehicle } = req.body;

    const iscaptainAlreadyExists = await captainModel.findOne({ email });
    if (iscaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain already exists' });
    }
    
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    }
    );
    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });
},

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token',token);

    res.status(200).json({ captain, token });

    }

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
}


