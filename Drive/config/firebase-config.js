const Firebase = require('firebase-admin');

const serviceAccount = require('../drive-d9c09-firebase-adminsdk-fbsvc-98b3c6b8d2.json');

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-d9c09.firebasestorage.app'
})

module.exports = Firebase;