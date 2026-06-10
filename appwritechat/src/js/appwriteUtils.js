import { account, FORMCOL, databases, MDBID, ID } from '../appwrite/appwriteClient.js';
import { handleFirstLogin } from './new_login.js';



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
            window.location.href = "./";
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

//Function to handle user registration
export async function register() {
  const registerButton = document.getElementById("registerBtn");

    registerButton.addEventListener("click", async () => {
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
        const name = document.getElementById("regName").value;

            try {
                const user = await account.create("unique()", email, password, name); //1. Создаём нового пользователя
                console.log("User created:", user);

                await account.createEmailPasswordSession(email, password);
                await handleFirstLogin();

                await account.updatePrefs({ //2. Добавляем роль user в пользовательские настройки
                roles: "user"           // по умолчанию даём роль "user"
            });

                registerButton.disabled = true; // Disable the button to prevent multiple clicks
                window.location.href = "./profile.html";
                
            } catch (err) {
                console.error("Registration error:", err.message);
              }
  });
}

/**
 * Handles form submission and stores data in Appwrite.
 * Expects form.html to have:
 * #name, #last-name, #country, #eye, #age, #submit-btn
 */

export function initFormHandler() {
  const submitBtn = document.getElementById("submit-btn");
  if (!submitBtn) {
    console.error("Submit button not found in DOM");
    return;
  }

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const lastName = document.getElementById("last-name")?.value.trim();
    const country = document.getElementById("country")?.value.trim();
    const eye = document.getElementById("eye")?.value.trim();
    const age = document.getElementById("age")?.value.trim();

    // Basic validation
    if (!name || !lastName || !country || !eye || !age) {
      console.error("All fields are required");
      return;
    }

   try {
      const doc = await databases.createDocument(
        MDBID,                    // your database ID
        FORMCOL,          // your collection ID
        ID.unique(),
        {
          name,
          lastName,
          country,
          eye,
          age: Number(age)
        } 
      );
      
      submitBtn.disabled = true;
      submitBtn.textContent = "Сохранение...";

      alert("✅ Ваши данные успешно сохранены!");
            
            // Очищаем форму
            document.getElementById("name").value = "";
            document.getElementById("last-name").value = "";
            document.getElementById("country").value = "";
            document.getElementById("eye").value = "";
            document.getElementById("age").value = "";

      console.log("Form submitted successfully:", doc);
      return doc;

    } catch (err) {
      console.error("Error submitting form:", err.message);
    } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Жмяк";
        }
  });
}

/**
 * Fetches all form submissions from Appwrite.
 * Returns an array of documents.
 */
export async function getFormData() {
    try {
        const responce = await databases.listDocuments(
            MDBID,
            FORMCOL
        );
        return responce.documents; //array of docs
    } catch (err) {
        console.error("Error fetching form data:", err.message);
        return[]; 
    }
}

/**
 * Protects a psge by  requiring the logged-in user to have the "admin" role.
 * Redirects to login.html (or any page you choose) if unauthorized.
 */
/**
 * Функция защиты страницы — требует, чтобы пользователь был авторизован
 * И имел роль "admin". Если нет — перенаправляет на главную страницу.
 */
 export async function requireAdmin() {
    try {
        const user = await account.get();
        const roles = user.prefs?.roles;
        console.log("User roles:", roles);
        //const isAdmin = 
        //Array.isArray(roles) && role.includes("admin");

        if (roles !== "admin") {
            console.warn("Access denied: user is not an admin");
            window.location.href = "/";
            return false;
        }
         return true; // access granted
    } catch (err) {
        console.warn("User not logged in or cannot fetch account");
        window.location.href = "/";
        return false;

    }
 }