const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase-config');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-d9c09.firebasestorage.app',
    unique: true
})

const upload = multer({
    storage: storage,
});

module.exports = upload;