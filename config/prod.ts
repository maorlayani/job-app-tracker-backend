
// module.exports = {
//   'dbURL': `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.huupjkb.mongodb.net/?retryWrites=true&w=majority`
// }


// export const dbURL = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.huupjkb.mongodb.net/?retryWrites=true&w=majority`
export default process.env.MONGODB_URI

