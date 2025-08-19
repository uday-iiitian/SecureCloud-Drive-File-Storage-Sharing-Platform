const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register',async (req, res, next) => {

    // Logic to handle user registration
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username: username,
        email,
        password: hashPassword
    })

    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {

    // Logic to handle user login
    const {email, password} = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const user = await userModel.findOne({ email: email });
    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ 
        userId: user._id,
        email: user.email,
        username: user.username
    }, process.env.SECRET);
    
    res.cookie('token',token);

    res.redirect('/');

})

router.get('/logout', (req, res) => {

    res.clearCookie('token');
    res.redirect('/users/login');
    
})

module.exports = router;