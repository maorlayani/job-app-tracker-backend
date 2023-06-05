"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyData_controller_1 = require("./companyData.controller");
const router = express_1.default.Router();
router.get('/:name', companyData_controller_1.getCompanyByName);
router.post('/', companyData_controller_1.addCompany);
// module.exports = router  
exports.default = router;
//# sourceMappingURL=companyData.routes.js.map