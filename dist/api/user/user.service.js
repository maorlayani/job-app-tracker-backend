"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUser = void 0;
const node_appwrite_1 = require("node-appwrite");
// import { APPWRITE_PROJECT_ID } from "../../private/privateKeys.service"
const { Client } = require('node-appwrite');
const client = new Client();
async function getLoggedInUser(JWT) {
    try {
        if (!JWT)
            return null;
        client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(process.env.APPWRITE_PROJECT_ID)
            .setJWT(JWT);
        const account = new node_appwrite_1.Account(client);
        const user = await account.get();
        return user.$id;
    }
    catch (err) {
        console.error('Cannot get logged in user', err);
    }
}
exports.getLoggedInUser = getLoggedInUser;
//# sourceMappingURL=user.service.js.map