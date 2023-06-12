"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = exports.remove = exports.update = exports.add = exports.getById = exports.query = void 0;
const axios_1 = __importDefault(require("axios"));
const companyData_service_1 = require("../company-data/companyData.service");
const db_service_1 = require("../../services/db.service");
const mongodb_1 = require("mongodb");
async function query(filterBy, userId) {
    const criteria = _buildCriteria(filterBy, userId);
    try {
        const collection = await (0, db_service_1.getCollection)('tracker');
        const applications = await collection.find(criteria).toArray();
        return applications;
    }
    catch (err) {
        console.error('ERROR: cannot find applications', err);
        throw err;
    }
}
exports.query = query;
async function getById(applicationId) {
    try {
        const collection = await (0, db_service_1.getCollection)('tracker');
        const application = await collection.findOne({ _id: new mongodb_1.ObjectId(applicationId) });
        return application;
    }
    catch (err) {
        console.error('ERROR: cannot find application', err);
        throw err;
    }
}
exports.getById = getById;
async function add(application, userId) {
    try {
        const collection = await (0, db_service_1.getCollection)('tracker');
        const companyData = await (0, companyData_service_1.getByName)(application.company);
        const applicationToAdd = {
            ...application,
            isPinned: false,
            isArchived: false,
            userId,
            ..._getCompanyData(companyData, application.companyDesc)
        };
        const { insertedId } = await collection.insertOne(applicationToAdd);
        const addedApplication = await getById(insertedId);
        return addedApplication;
    }
    catch (err) {
        throw err;
    }
}
exports.add = add;
async function update(application) {
    try {
        const applicationToSave = { ...application, _id: new mongodb_1.ObjectId(application._id) };
        const collection = await (0, db_service_1.getCollection)('tracker');
        await collection.updateOne({ _id: applicationToSave._id }, { $set: applicationToSave });
        return applicationToSave;
    }
    catch (err) {
        throw err;
    }
}
exports.update = update;
async function remove(applicationId) {
    try {
        const collection = await (0, db_service_1.getCollection)('tracker');
        await collection.deleteOne({ _id: new mongodb_1.ObjectId(applicationId) });
        return applicationId;
    }
    catch (err) {
        console.error('ERROR: cannot remove application', err);
        throw err;
    }
}
exports.remove = remove;
function _buildCriteria(filterBy, userId) {
    let criteria = { userId: userId };
    const { searchInput, location, position, status } = filterBy;
    if (searchInput) {
        const regex = new RegExp(searchInput, 'i');
        const regexTest = { $regex: regex };
        criteria = {
            ...criteria,
            $or: [
                { location: regexTest },
                { position: regexTest },
                { company: regexTest }
            ]
        };
    }
    if (location.length)
        criteria.location = { $in: location };
    if (position.length)
        criteria.position = { $in: position };
    if (status.length)
        criteria.status = { $in: status };
    return criteria;
}
function _getCompanyData(companyData, companyDesc) {
    const logos = companyData.logos;
    const iconLogo = logos.find(logo => logo.type === 'icon');
    const iconNA = 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1677083107/job-application-tracker/na-icon_ngcgpa.png';
    let applicationData = { logoUrl: '', companyDesc: '', links: [{ name: '', url: '' }] };
    applicationData.logoUrl = iconLogo ? iconLogo.formats[0].src : iconNA;
    applicationData.links = companyData.links;
    applicationData.companyDesc = companyDesc ? companyDesc : companyData.description;
    return applicationData;
}
async function _createNewTrackerBoard(userId) {
    const collection = await (0, db_service_1.getCollection)('tracker');
    const newTrackerBoard = {
        userId,
        applications: []
    };
    const { insertedId } = await collection.insertOne(newTrackerBoard);
    return insertedId;
}
async function getCoordinates(location) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const res = await axios_1.default.get(url);
        return res;
    }
    catch (err) {
        console.error('Cannot get coordinates', err);
    }
}
exports.getCoordinates = getCoordinates;
//# sourceMappingURL=tracker.service.js.map