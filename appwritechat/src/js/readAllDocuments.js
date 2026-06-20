// readAllDocuments.js
import { databases, MDBID, MTID } from './appwriteUtils.js';

export async function readAllDocuments() {
    try {
        const response = await databases.listDocuments(MDBID, MTID);
        console.log("All documents:", response.documents);
        return response.documents;
    } catch (error) {
        console.error("Error reading all documents:", error);
        throw error;
    }
}