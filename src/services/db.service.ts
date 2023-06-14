import { MongoClient } from 'mongodb'

import configUrl from '../config'

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
        return db
    } catch (err) {
        throw err
    }
}