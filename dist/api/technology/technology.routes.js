"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const technology_controller_1 = require("./technology.controller");
const router = express_1.default.Router();
router.get('/', technology_controller_1.getTechnologies);
router.get('/:id', technology_controller_1.getTechnologyById);
// module.exports = router    
exports.default = router;
//# sourceMappingURL=technology.routes.js.map