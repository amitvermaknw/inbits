import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        // credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS as admin.ServiceAccount),
        credential: admin.credential.applicationDefault(),
        databaseURL: "https://streettadka-default-rtdb.firebaseio.com"
    });
}

const db = admin.firestore();
export { db };