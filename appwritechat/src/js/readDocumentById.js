// readDocumentById.js
import { databases, MDBID, MTID } from './appwriteUtils.js';

export async function readDocumentById(documentId) {
    try {
        const response = await databases.getDocument(MDBID, MTID, documentId);
        console.log("Document:", response);
        return response;
    } catch (error) {
        console.error(`Error reading document ${documentId}:`, error);
        throw error;
    }
}