// readDocumentById.js
import { databases, MDBID, collectionId } from '../appwrite/appwriteClient';

const documentId = '6a3670bc00339d21c25d';

export async function readDocumentById() {
     const tStart = performance.now();
    try {
        const response = await databases.getDocument(MDBID, collectionId, documentId);

        const tEnd = performance.now();
        const timeMany = (tEnd - tStart).toFixed(2);

        console.log(`Document: ${timeMany} мс`, response);
        return response;
    } catch (error) {
        console.error(`Error reading document ${documentId}:`, error);
        throw error;
    }
}

window.readDocumentById = readDocumentById;
