"use strict";
// module.exports = {
//   'dbURL': `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.huupjkb.mongodb.net/?retryWrites=true&w=majority`
// }
Object.defineProperty(exports, "__esModule", { value: true });
const dbURL = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.huupjkb.mongodb.net/?retryWrites=true&w=majority`;
// export default dbURL
exports.default = process.env.MONGODB_URI;
//# sourceMappingURL=prod.js.map