import { bucketID } from "../appwrite/appwriteClient";
import { listBucketFiles, getFilePreview } from "./appwriteUtils";

export async function displayBucketFiles() {
    const container = document.getElementById("fileContainer");

    async function loadFiles() {
        const files = await listBucketFiles(bucketID);

        container.innerHTML = ""; //clear

        files.forEach(file => {
            const previewUrl = getFilePreview(bucketID, file.$id);

            const card = document.createElement("div");
            card.className = "bg-white/5 border border-white/6 rounded-lg p-3 flex flex-col gap-2 shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl overflow-hidden dark:bg-slate-800/60 dark:border-white/5";

        card.innerHTML = `
            <img src="${previewUrl}" alt="${file.name}" class="w-full h-36 object-cover rounded-md bg-gradient-to-br from-slate-200 to-indigo-200 dark:from-gray-700 dark:to-slate-900">
            <strong class="block text-sm font-medium text-gray-800 dark:text-slate-100 truncate">${file.name}</strong>
            <small class="text-xs text-gray-500 dark:text-gray-400">${(file.sizeOriginal / 1024).toFixed(1)} KB</small>
            <a href="${previewUrl}" target="_blank" class="mt-2 inline-block bg-gradient-to-r from-teal-400 to-blue-500 text-white px-3 py-1 rounded-md font-semibold shadow">Open</a>
        `;

        container.appendChild(card);
        });
    }
    loadFiles();
}