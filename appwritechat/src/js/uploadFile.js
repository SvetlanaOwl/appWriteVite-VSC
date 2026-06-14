import { bucketID } from '../appwrite/appwriteClient.js';
import { uploadToBucket } from './appwriteUtils.js';

export async function uploadFile() {
    // Получаем элементы
    const fileInput = document.getElementById("fileInput");
    const preview = document.getElementById("preview");
    const status = document.getElementById("status");
    const uploadBtn = document.getElementById("uploadBtn");

    let selectedFile = null;

    // Обработка выбора файла
    fileInput.addEventListener("change", (e) => {
        selectedFile = e.target.files[0];

        if (selectedFile) {
            preview.src = URL.createObjectURL(selectedFile);
            preview.style.display = "block";
        }
    });

    // Обработка нажатия кнопки загрузки
    uploadBtn.addEventListener("click", async () => {
        if (!selectedFile) {
            status.textContent = "Please select a file first";
            return;
        }

        status.textContent = "Uploading...";

        try {
            const result = await uploadToBucket(selectedFile, bucketID);
            status.textContent = "✅ Upload successfull! File ID:" + result.$id;
            
        } catch (err) {
            status.textContent = "❌Upload failed:" +  err.message;
        } 
    });
}