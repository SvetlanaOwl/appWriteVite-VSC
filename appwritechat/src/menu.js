import { databases, query, account, MDBID, MTID } from "./appwrite/appwriteClient.js";

async function loadMenu() {
    const result = await databases.listDocuments(
        MDBID,
        MTID,
        [
            query.equal("visible", true),
            query.orderAsc("order")
        ]
    );
    console.log("Menu items loaded:", result.documents);
    return result.documents;
}

//Function to filter menu items based on user roles  | Фильтрация меню по ролям пользователя
function filterMenuByRole(menuItems, userRoles) { //UserRoles is an array of roles assigned to the user | userRoles — это массив ролей, присвоенных текущему пользователю
    return menuItems.filter(item => //If the menu item has no roles defined, it`s visible to everyone | Если у пункта меню не указаны роли — он виден всем пользователям
        item.roles.some(role => userRoles.includes(role)) // If the menu item has roles defined, check if the user has at least one of those roles |  
        // Если у пункта меню указаны роли — показываем только если у пользователя есть хотя бы одна из этих ролей
    );
}
/*// Функция для рендеринга меню в шапке сайта с учётом ролей пользователя
 export async function renderHeader() { // Получаем текущего пользователя
    const user = await account.get();// Предполагается, что пользователь авторизован и у него есть поле 'prefs.roles',
    // которое содержит массив ролей
    const userRoles = user.prefs.roles || [];// Извлекаем роли пользователя (если поле отсутствует — используем пустой массив)
    const menuItems = await loadMenu(); // Загружаем пункты меню из базы данных
    const allowed = filterMenuByRole(menuItems, userRoles); // Фильтруем пункты меню в зависимости от ролей пользователя
    const nav = document.querySelector("#header-nav");// Находим элемент навигации в шапке Предполагается, что в HTML есть <nav id="header-nav"></nav>
    const profileName = document.getElementById("profileName");
    if (profileName) {
        profileName.textContent = user.name;
    }
    //document.getElementById("status").textContent = `Welcome: ${user.name || "User"}`;
    //document.getElementById("userEmail").textContent = user.email || "...@gmail.com";

    nav.innerHTML = allowed // Генерируем HTML для разрешённых пунктов меню
        .map(item => `<a href="${item.href}">${item.label}</a>`)
        .join(""); // Объединяем все ссылки в одну строку
 }*/

// Функция для рендера меню в шапке сайта на основе ролей пользователя
export async function renderHeader() {     // Получаем текущего пользователя
    const user = await account.get();     // Предполагается, что пользователь авторизован и 
    // у него есть поле 'prefs.roles', которое содержит массив ролей
    const userRoles = user?.prefs?.roles || [];    
    const menuItems = await loadMenu();     // Загружаем пункты меню из базы данных
    const allowed = filterMenuByRole(menuItems, userRoles);  // Фильтруем меню в зависимости от ролей пользователя  
    
    const menuHTML = allowed // Генерируем HTML для разрешённых пунктов меню
        .map(item => `<a href="${item.href}">${item.label}</a>`)
        .join("");

    const desktopMenu = document.querySelector("#header-nav"); // Десктопное меню: <nav id="header-nav"></nav>
    if (desktopMenu) desktopMenu.innerHTML = menuHTML;

    const mobileNav = document.querySelector("#mobile-nav");// Мобильное меню: <nav id="mobile-nav"></nav>
    if (mobileNav) {
        mobileNav.innerHTML = menuHTML;
        mobileNav.offsetHeight; // фикс перерисовки для Safari
    }

    const profileName = document.getElementById("profileName");// Имя пользователя в шапке
    if (profileName) {
        profileName.textContent = user.name;
    }
}

 export async function renderProfileData() {
    const user = await account.get()
    .then(response => {
        console.log('User Account:', response);
        document.getElementById("welcomeMessage").textContent = `Welcome: ${response.name}`;
        document.getElementById("userEmail").textContent = `Email: ${response.email}`;
        document.getElementById("userStatus").innerText = `Current status: ${response.status ? "on" : "off"}`;
        document.getElementById("userRole").textContent = `Role: ${response.prefs.roles}`;
        //document.getElementById("emailVerification").textContent = `Email Verified: ${response.emailVerification}`;
        document.getElementById("emailVerification").textContent = `Email Verified: ${response.emailVerification ? "Yes" : "No"}`;
        const localRegistration = new Date(response.registration).toLocaleString();
        document.getElementById("registrationDate").textContent = `Registered on: ${localRegistration}`;
    })
    
    .catch(error => {
        console.log('User not logged in:', error);
    });
}
   //Connect to appWrite and fetch items from the footer_menu table
 export async function renderFooter() {
    const result = await databases.listDocuments(
       MDBID,                //database ID
        'footer_menu',        // collection ID
        [
            query.orderAsc("column"),
            query.orderAsc("order")
        ]
    ); 
    const footerItems = result.documents;
    console.log("Footer items loaded:", footerItems);

    //Groop by column
    const columns = {1: [], 2: [], 3: []};

    footerItems.forEach(item => {
        if (columns[item.column]) {
            columns[item.column].push(item);
        }
    });
    //Sort each column by order
    Object.values(columns).forEach(col =>
        col.sort((a, b) => a.order - b. order)
    );
    return columns; //<-IMPORTANT
 }
// Loads 3 footer menu in 3 columns
export async function loadFooterMenu() {
    // Загружаем и группируем пункты меню футера из базы данных
    const columns = await renderFooter(); // fetch + group
    // Проходим по всем трём колонкам
    for (let col = 1; col <= 3; col++) {
        const container = document.getElementById(`footer-col-${col}`);
        const items = columns[col];
        // Если в колонке нет пунктов — пропускаем
        if (!items || items.length === 0) continue;
        // Получаем заголовок колонки (если есть документ с title)
        const title = items.find(i => i.title)?.title ?? "";
        // Генерируем HTML для текущей колонки
        container.innerHTML = `
            <div class="px-4">
                <h3 class="font-semibold text-gray-800 dark:text-gray-500 mb-4">${title}</h3>
                <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    ${items.map(item => `
                        <li>
                            <a href="${item.href}" 
                               class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                                ${item.label}
                            </a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `;
    }
}