"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTechnologyById = exports.getTechnologies = void 0;
const technology_service_1 = require("./technology.service");
async function getTechnologies(req, res) {
    try {
        // if (typeof req.query.techSerach === 'string') {
        // const techSearch = JSON.parse(req.query.techSerach)
        console.log(req.query.techSerach);
        // }
        const technologies = await (0, technology_service_1.query)(req.query.techSerach);
        res.send(technologies);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to get technologies' });
    }
}
exports.getTechnologies = getTechnologies;
async function getTechnologyById(req, res) {
    try {
        const technologyId = req.params.id;
        const technology = await (0, technology_service_1.getById)(technologyId);
        res.send(technology);
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to get technology' });
    }
}
exports.getTechnologyById = getTechnologyById;
// module.exports = {
//     getTechnologies,
//     getTechnologyById
// }
//# sourceMappingURL=technology.controller.js.map