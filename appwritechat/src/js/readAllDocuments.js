// readAllDocuments.js
import { databases, MDBID, collId } from '../appwrite/appwriteClient';

export async function readAllDocuments() {
    const tStart = performance.now();
    try {
        const response = await databases.listDocuments(MDBID, collId);

        const tEnd = performance.now();
        const timeMany = (tEnd - tStart).toFixed(2);

        console.log(`All documents: ${timeMany} мс`, response.documents);
        return response.documents;
    } catch (error) {
        console.error("Error reading all documents:", error);
        throw error;
    }
}

// ЭТА СТРОКА ДЕЛАЕТ ФУНКЦИЮ ВИДИМОЙ ДЛЯ onclick В HTML
window.readAllDocuments = readAllDocuments;

