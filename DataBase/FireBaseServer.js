import admin from "firebase-admin"
import fs from 'fs'

const serviceAccount = JSON.parse(fs.readFileSync("./src/coderhouse-6f4ab-firebase-adminsdk-mlkug-04ee580073.json", 'utf8'))
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
