import admin from "firebase-admin"

const serviceAccount = JSON.parse(process.env.FIRE_BASE)
try{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Base Firebase conectada!')
    
} catch(error) {
    console.log('No se pudo conectar a la base')
    throw error
}
const db = admin.firestore();

export default db
