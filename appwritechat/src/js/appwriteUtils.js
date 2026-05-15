import { account  } from "./appwriteClient.js";
import { uploadAvatar } from "./avatarUpload.js";

//Function to handle user login
export async function login() {
    const loginButton = document.getElementById("loginBtn");
    loginButton.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        try {
            const session = await account.createEmailPasswordSession(email, password);
            console.log("Logged in:", session);
            window.location.href = "./profile.html";
        } catch (err) {
            console.error("Login error:", err.message);
        }
    });
}

//Function to handle user logout
export async function logout() {
    const logoutButton = document.getElementById("logoutBtn");
    logoutButton.addEventListener("click", async () => {
        try {
            await account.deleteSession("current");
            window.location.href = "./index.html";
        } catch (err) {
            console.error("Logout error:", err.message);
        }
    });
}
//Function to update currently logged in usser account name
export async function updateAccountName(newName) {
    const updateNameButton = document.getElementById("updateNameBtn");
   
    updateNameButton.addEventListener("click", async () => {
    const newName = document.getElementById("newName").value;
    try {
        const updateAccount = await account.updateName(newName);
        window.location.reload();
    } catch (err) {
        console.error("Error updating account name:", err.message);
    }
});
}
// Функция слушатель для загрузки и смены аватара в шапке и профиле
export async function setAvatar() {
    const avatarImg = document.querySelector('#profilePic'); // Изображение профиля в profile.js
    const avatarInput = document.querySelector('#avatarInput'); // Скрытый input для загрузки аватара

    avatarImg.addEventListener('click', () => avatarInput.click()); // При клике на фото профиля открываем выбор файла

    avatarInput.addEventListener('change', async (e) => { // Слушаем выбор файла
        const file = e.target.files[0]; // Получаем выбранный файл и помещаем его в массив
        if (!file) return; // Если файл не выбран, выходим из функции

        const newUrl = await uploadAvatar(file); // Загружаем аватар и получаем новый URL

        // Обновляем изображение профиля в интерфейсе мгновенно
        avatarImg.src = newUrl;
    });
}

// Сохранение цвета ника пользователя
export async function saveNicknameColor(color) {
    try {
        const prefs = await account.getPrefs();        // получаем текущие настройки

        prefs.nicknameColor = color;                   // добавляем/меняем цвет

        await account.updatePrefs(prefs);              // сохраняем в Appwrite

        console.log('Цвет ника сохранён:', color);
        return true;
    } catch (error) {
        console.error('Ошибка сохранения цвета:', error);
        return false;
    }
}

// Получение цвета ника пользователя
export async function getNicknameColor(defaultColor = '#60a5fa') {
    try {
        const prefs = await account.getPrefs();
        return prefs.nicknameColor || defaultColor;
    } catch (error) {
        console.error('Ошибка получения цвета ника:', error);
        return defaultColor;
    }
}