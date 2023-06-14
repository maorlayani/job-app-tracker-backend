"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesBylocation = exports.deleteApplication = exports.updateApplication = exports.addApplication = exports.getApplicationById = exports.getApplications = void 0;
const tracker_service_1 = require("./tracker.service");
const user_service_1 = require("../user/user.service");
async function getApplications(req, res) {
    try {
        let filterBy = {
            position: [], location: [], status: [], searchInput: ''
        };
        if (typeof req.query.filterBy === 'string')
            filterBy = JSON.parse(req.query.filterBy);
        let JWT = '';
        if (typeof req.query.JWT === 'string')
            JWT = JSON.parse(req.query.JWT);
        let userId = await _setUserId(JWT);
        const applications = await (0, tracker_service_1.query)(filterBy, userId);
        res.send(applications);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to get applications' });
    }
}
exports.getApplications = getApplications;
async function getApplicationById(req, res) {
    try {
        const applicationId = req.params.id;
        const application = await (0, tracker_service_1.getById)(applicationId);
        res.send(application);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to get application' });
    }
}
exports.getApplicationById = getApplicationById;
async function addApplication(req, res) {
    try {
        const application = req.body.application;
        const JWT = req.body.JWT;
        console.log(req.body);
        let userId = await _setUserId(JWT);
        const addedApplication = await (0, tracker_service_1.add)(application, userId);
        res.send(addedApplication);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to add application' });
    }
}
exports.addApplication = addApplication;
async function updateApplication(req, res) {
    try {
        const application = req.body;
        const updatedApplication = await (0, tracker_service_1.update)(application);
        res.send(updatedApplication);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to add application' });
    }
}
exports.updateApplication = updateApplication;
async function deleteApplication(req, res) {
    try {
        const applicationId = req.params.id;
        await (0, tracker_service_1.remove)(applicationId);
        res.send({ msg: 'Removed succesfully' });
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to remove application' });
    }
}
exports.deleteApplication = deleteApplication;
async function getCoordinatesBylocation(req, res) {
    try {
        let location = req.params.location;
        const results = await (0, tracker_service_1.getCoordinates)(location);
        res.send(results);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to get coordinates' });
    }
}
exports.getCoordinatesBylocation = getCoordinatesBylocation;
async function _setUserId(jwt) {
    try {
        let userId = await (0, user_service_1.getLoggedInUser)(jwt);
        if (!userId)
            userId = 'guest101';
        return userId;
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=tracker.controller.js.map