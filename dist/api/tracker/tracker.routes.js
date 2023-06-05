"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tracker_controller_1 = require("./tracker.controller");
const router = express_1.default.Router();
router.get('/', tracker_controller_1.getApplications);
router.get('/:id', tracker_controller_1.getApplicationById);
router.get('/location/:location', tracker_controller_1.getCoordinatesBylocation);
router.post('/', tracker_controller_1.addApplication);
router.put('/:id', tracker_controller_1.updateApplication);
router.delete('/:id', tracker_controller_1.deleteApplication);
// module.exports = router  
exports.default = router;
//# sourceMappingURL=tracker.routes.js.map