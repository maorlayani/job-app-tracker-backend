"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCompany = exports.getCompanyByName = void 0;
const companyData_service_1 = require("./companyData.service");
async function getCompanyByName(req, res) {
    try {
        const companyName = req.params.name;
        const company = await (0, companyData_service_1.getByName)(companyName);
        res.send(company);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to get company' });
    }
}
exports.getCompanyByName = getCompanyByName;
async function addCompany(req, res) {
    try {
        const companyName = req.body;
        const addedApplication = await (0, companyData_service_1.add)(companyName);
        res.send(addedApplication);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to add application' });
    }
}
exports.addCompany = addCompany;
// module.exports = {
//     addCompany,
//     getCompanyByName
// }
//# sourceMappingURL=companyData.controller.js.map