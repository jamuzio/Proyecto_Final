import { MongoClient } from 'mongodb'
import logger from "../Tools/logger.js"

const MONGOATLAS = process.env.MONGOATLAS
const MONGOLOCAL='mongodb://localhost:27017'

const CNXSTR = process.env.NODE_ENV === 'production' ? MONGOATLAS : MONGOLOCAL

const mongodb = {
    cnxStr: CNXSTR,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }
}

const client = new MongoClient(mongodb.cnxStr, mongodb.options)
let dbCoderhouse
try{
    await client.connect()
    dbCoderhouse = client.db("CoderHouse")
}
catch(error){
    logger.fatal(`A ocurrido un error al iniciar la base: \n\t ${error.stack}`)
    throw error
}
export default dbCoderhouse