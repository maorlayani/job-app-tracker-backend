"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = void 0;
// const MongoClient = require('mongodb').MongoClient
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../config"));
// module.exports = {
//     getCollection
// }
// Database Name
const dbName = 'trackerApp_db';
var dbConn = null;
async function getCollection(collectionName) {
    try {
        const db = await connect();
        const collection = await db.collection(collectionName);
        return collection;
    }
    catch (err) {
        throw err;
    }
}
exports.getCollection = getCollection;
async function connect() {
    if (dbConn)
        return dbConn;
    try {
        const client = await mongodb_1.MongoClient.connect(config_1.default);
        const db = client.db(dbName);
        dbConn = db;
        // console.log(dbConn);
        return db;
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=db.service.js.map