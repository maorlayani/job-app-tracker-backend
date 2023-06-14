import { Account } from "node-appwrite";
// import { APPWRITE_PROJECT_ID } from "../../private/privateKeys.service"

const { Client } = require('node-appwrite');

const client = new Client();

export async function getLoggedInUser(JWT: string) {
    try {
        if (!JWT) return null
        client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(process.env.APPWRITE_PROJECT_ID)
            // .setProject(APPWRITE_PROJECT_ID)
            .setJWT(JWT)
        const account = new Account(client);
        const user = await account.get()
        return user.$id
    } catch (err) {
        console.error('Cannot get logged in user', err);
    }
}