import { Client, Storage } from "node-appwrite";

export default async ({ req, res, log }) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const storage = new Storage(client);

    const bucketId = process.env.BUCKET_ID;

    // Comma-separated prefixes to protect
    const protectedPrefixes = (process.env.PROTECTED_PREFIXES || "avatar_")
      .split(",")
      .map(p => p.trim());

    const now = Date.now();
    const cutoff24h = now - 24 * 60 * 60 * 1000; // 24 hours
    const cutoff5h = now - 5 * 60 * 60 * 1000;   // 5 hours

    const files = await storage.listFiles(bucketId);

    let deleted = [];
    let skipped = [];

    for (const file of files.files) {
      const name = file.name;
      const createdAt = new Date(file.$createdAt).getTime();

      // 1. Skip protected prefixes
      if (protectedPrefixes.some(prefix => name.startsWith(prefix))) {
        skipped.push({ name, reason: "protected prefix" });
        continue;
      }

      // 2. Special rule: deleteme.jpg → delete after 5 hours
      if (name === "deleteme.jpg") {
        if (createdAt < cutoff5h) {
          await storage.deleteFile(bucketId, file.$id);
          deleted.push(name);
        } else {
          skipped.push({ name, reason: "not 5 hours old yet" });
        }
        continue;
      }

      // 3. Default rule: delete after 24 hours
      if (createdAt < cutoff24h) {
        await storage.deleteFile(bucketId, file.$id);
        deleted.push(name);
      } else {
        skipped.push({ name, reason: "not 24 hours old yet" });
      }
    }

    return res.json({
      status: "completed",
      deleted,
      skipped,
      protectedPrefixes
    });

  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};