import config from '../src/config.js'
import { MongoClient } from 'mongodb'

const client = new MongoClient(config.mongodb.cnxStr, config.mongodb.options)
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