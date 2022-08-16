import admin from "firebase-admin"
import logger from "../Tools/logger.js";

const serviceAccount = JSON.parse(process.env.FIRE_BASE)
try{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    
} catch(error) {
    logger.fatal(`A ocurrido un error al iniciar la base: \n\t ${error.stack}`)
    throw error
}
const db = admin.firestore();

export default db
