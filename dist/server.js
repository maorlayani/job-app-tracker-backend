"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import path from 'path'
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(express.static('public'))
// if (process.env.NODE_ENV === 'production') {
// Express serve static files on production environment
// app.use(express.static(path.resolve(__dirname, 'public')))
// } else {
// Configuring CORS 
const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    // origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://jobs-app-tracker.vercel.app/','*'],
    origin: '*',
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
// }
const tracker_routes_1 = __importDefault(require("./api/tracker/tracker.routes"));
const companyData_routes_1 = __importDefault(require("./api/company-data/companyData.routes"));
const technology_routes_1 = __importDefault(require("./api/technology/technology.routes"));
// routes 
app.use('/api/tracker', tracker_routes_1.default);
app.use('/api/company', companyData_routes_1.default);
app.use('/api/technology', technology_routes_1.default);
// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/board/123 it will still respond with 
// our SPA (single page app) (the index.html file) and allow react-router to take it from there
// app.get('/**', (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
const port = process.env.PORT || 3030;
app.listen(port, () => console.log('Server running at port: ' + port));
// module.exports = app;
//# sourceMappingURL=server.js.map