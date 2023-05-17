// const MongoClient = require('mongodb').MongoClient
import { MongoClient } from 'mongodb'

import configUrl from '../config'

// module.exports = {
//     getCollection
// }

// Database Name
const dbName = 'trackerApp_db'

var dbConn: any = null

export async function getCollection(collectionName: string) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(configUrl)
        const db = client.db(dbName)
        dbConn = db
        // console.log(dbConn);
        return db
    } catch (err) {
        throw err
    }
}




