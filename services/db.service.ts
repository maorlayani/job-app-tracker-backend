const MongoClient = require('mongodb').MongoClient

const configUrl = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'trackerApp_db'

var dbConn: any = null

async function getCollection(collectionName: string) {
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
        const client = await MongoClient.connect(configUrl.dbURL,
            { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        // console.log(dbConn);
        return db
    } catch (err) {
        throw err
    }
}




