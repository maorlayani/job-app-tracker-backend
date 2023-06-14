"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.getByName = void 0;
const axios_1 = __importDefault(require("axios"));
const db_service_1 = require("../../services/db.service");
const mongodb_1 = require("mongodb");
// import { MY_BRAND_API_KEY, MY_BRAND_BASE_URL } from '../../private/privateKeys.service'
async function getByName(companyName) {
    try {
        const collection = await (0, db_service_1.getCollection)('company_data');
        const regex = new RegExp(companyName, 'i');
        const regexTest = { $regex: regex };
        let company = await collection.findOne({ name: regexTest });
        if (!company) {
            company = await add(companyName);
        }
        return company;
    }
    catch (err) {
        console.error('ERROR: cannot find company data', err);
        throw err;
    }
}
exports.getByName = getByName;
async function getById(companyId) {
    try {
        const collection = await (0, db_service_1.getCollection)('company_data');
        const company = await collection.findOne({ _id: new mongodb_1.ObjectId(companyId) });
        return company;
    }
    catch (err) {
        console.error('ERROR: cannot find company data', err);
        throw err;
    }
}
async function add(companyName) {
    try {
        const collection = await (0, db_service_1.getCollection)('company_data');
        let companyData = await _getCompanyData(companyName, 'com');
        if (!companyData)
            companyData = await _getCompanyData(companyName, 'io');
        if (!companyData) {
            companyData = {
                name: companyName,
                description: '',
                links: [],
                logos: []
            };
        }
        const { insertedId } = await collection.insertOne(companyData);
        const addedCompany = await getById(insertedId);
        return addedCompany;
    }
    catch (err) {
        throw err;
    }
}
exports.add = add;
async function _getCompanyData(companyName, domainExtension) {
    try {
        const apiData = await (0, axios_1.default)(`${process.env.MY_BRAND_BASE_URL}${companyName}.${domainExtension}`, 
        // `${MY_BRAND_BASE_URL}${companyName}.${domainExtension}`,
        {
            headers: {
                'Authorization': `Bearer ${process.env.MY_BRAND_API_KEY}`
                // 'Authorization': `Bearer ${MY_BRAND_API_KEY}`
            }
        });
        if (!apiData.data.name)
            return null;
        apiData.data.name = apiData.data.name.toLowerCase();
        return apiData.data;
    }
    catch (err) {
        console.error(err);
    }
}
//# sourceMappingURL=companyData.service.js.map