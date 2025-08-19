const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

function authe(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        return next();
    }
    catch(err){
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = authe;
