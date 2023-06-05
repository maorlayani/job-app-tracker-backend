"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesBylocation = exports.deleteApplication = exports.updateApplication = exports.addApplication = exports.getApplicationById = exports.getApplications = void 0;
const tracker_service_1 = require("./tracker.service");
async function getApplications(req, res) {
    try {
        let filterBy = {
            position: [], location: [], status: [], searchInput: ''
        };
        if (typeof req.query.filterBy === 'string') {
            filterBy = JSON.parse(req.query.filterBy);
        }
        const applications = await (0, tracker_service_1.query)(filterBy);
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
        const application = req.body;
        const addedApplication = await (0, tracker_service_1.add)(application);
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
        // location = location.split('-').join(' ')
        // console.log(location);
        const coor = await (0, tracker_service_1.getCoordinates)(location);
        // console.log('******************************************************************', coor);
        // console.log(typeof coor);
        // res.send(coor.data)
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to get coordinates' });
    }
}
exports.getCoordinatesBylocation = getCoordinatesBylocation;
// module.exports = {
//     getApplications,
//     getApplicationById,
//     addApplication,
//     updateApplication,
//     deleteApplication,
//     getCoordinatesBylocation
// }
//# sourceMappingURL=tracker.controller.js.map