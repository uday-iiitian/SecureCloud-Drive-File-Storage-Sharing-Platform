const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase-config');
const serviceAccount = require('../drive-d9c09-firebase-adminsdk-fbsvc-98b3c6b8d2.json');

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-d9c09.firebasestorage.app',
    unique: true
})

const upload = multer({
    storage: storage,
});

module.exports = upload;