import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        // credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS as admin.ServiceAccount),
        credential: admin.credential.applicationDefault(),
        databaseURL: "https://streettadka-default-rtdb.firebaseio.com"
    });

    console.log("✅ Firebase Admin initialized");
}

const db = admin.firestore();
export { db };