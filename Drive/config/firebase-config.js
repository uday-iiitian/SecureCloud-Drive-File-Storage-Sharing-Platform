const Firebase = require('firebase-admin');

// Parse JSON from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-d9c09.appspot.com'   // <-- check your Firebase bucket name in Firebase Console
});

module.exports = Firebase;
