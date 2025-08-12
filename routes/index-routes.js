const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const fileModel = require('../models/file-model'); 
const authMiddleware = require('../middlewares/authe');
const firebase = require('../config/firebase-config');

router.get('/', authMiddleware, async (req, res) => {

    console.log(req.user);
    const files = await fileModel.find({ user: req.user.userId });

    res.render('home', {files: files, user: req.user});
});

router.post('/upload',authMiddleware, upload.single('file'), async (req, res) => {
    const newfile = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId
    })

    res.redirect('/');

});

router.get('/download/:path', authMiddleware, async (req, res) => {

    const loggedInUser = req.user.userId;
    const path = req.params.path;
    const file = await fileModel.findOne({ path: path, user: loggedInUser });
    if (!file) {
        return res.status(401).send('Unauthorized access to this file');
    }
    
    const signedUrl = await firebase.storage().bucket().file(file.path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60 // 1 hour
    });
    console.log(signedUrl[0]);
    res.redirect(signedUrl[0]);
    
})

module.exports = router;

