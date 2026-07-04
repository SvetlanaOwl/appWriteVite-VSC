//src\js\delete-documents.js
import { databases } from '../appwrite/appwriteClient.js';

export default async () => {
    const DATABASE_ID = "69cdd093002b91dd3229";   
    const COLLECTION_ID = "fruits";

    const CONCURRENCY = 3;
    let totalDeleted = 0;

    async function deleteBatch(docs) {
      const queue = [];
      for (const doc of docs) {
        queue.push(() => databases.deleteDocument(DATABASE_ID, COLLECTION_ID, doc.$id));
      }

      const running = new Set();

      async function run(fn) {
        const p = fn();
        running.add(p);
        p.finally(() => running.delete(p));
        if (running.size >= CONCURRENCY) {
          await Promise.race(running);
        }
        return p;
      }

      await Promise.all(queue.map(run));
      totalDeleted += docs.length;
    }
    let batchCount = 0;

    while (true) {
      const list = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [], 100);
            if (list.total === 0) break;
      await deleteBatch(list.documents);
    }

    const result = {
      success: true,
      message: `Deleted ${totalDeleted} documents`
    };

    console.log(result.message);
    return result;
};