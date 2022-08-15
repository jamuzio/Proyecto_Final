import { MongoClient } from 'mongodb'

const MONGOATLAS = process.env.MONGOATLAS

const mongodb = {
    cnxStr: MONGOATLAS,
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
    console.log(error)
    throw error
}
export default dbCoderhouse