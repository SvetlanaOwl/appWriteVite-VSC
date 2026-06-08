//appwriteClient.js
import { Client, Account, Databases, Query, ID } from 'appwrite';// Ensure is available globally (from CDN)
export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('69cc6d22001c93ee189a')
    .setSession('cookie');
//Menu table client setup
export const MDBID = "69cdd093002b91dd3229"; //database id for menu
export const MTID = "headermenu"; //Collection ID for menu
export const account = new Account(client);
export const databases = new Databases(client);
export const query = Query;
export { ID, Query };
export const USERSCOL = 'users'; //user collection ID
export const FORMCOL = 'form';
