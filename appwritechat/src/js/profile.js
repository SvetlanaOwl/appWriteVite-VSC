import { renderProfileData  } from "./menus.js";
import { setAvatar } from "./appwriteUtils.js";

export function createProfileCard() {
    const profileCardSection = document.getElementById('profileSection');
    if (!profileCardSection) {
        console.error('profileCardSection element not found');
        return;
    }

    // Main header structure using template literal (much cleaner)
    profileCardSection.innerHTML = `
    <!-- Profile card -->
    <div class="flex items-center justify-center py-12 px-4">
        <div class="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden
        dark:bg-gray-800 dark:shadow-gray-700 dark:ring-1 dark:ring-zinc-700">
        
            <!-- Cover / Header -->
            <div class="h-48 bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] dark:from-[#1e2937] dark:to-[#334155] relative">
                <div class="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <!-- Profile Picture -->
                    <div class="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg dark:border-gray-500">
                    <img id="profilePic"
                        src="../src/assets/avatar_owl.jpg"
                        alt="Profile Picture"
                        class="w-full h-full object-cover hover:scale-105 transition-transform duretion-300 cursor-pointer">
                        <input type="file" id="avatarInput" accept="image/*" class="hidden">
                    </div>
                </div>
            </div>
        <div class="pt-16 pb-8 px-8">
            <!-- User Info -->
            <div class="text-center mb-8">
                <h1 id="welcomeMessage" class="text-3xl font-bold text-center mb-6 dark:text-slate-500"></h1>
                <p id="userEmail" class="text-gray-500 mt-1">@fox.2025.owl • fox.2025.owl@gmail.com</p>
                <div id="userRole" class="inline-flex items-center gap-1.5 mt-3 px-4 py-1 bg-emerald-100 
                text-emerald-700 rounded-full text-sm font-medium dark:bg-emerald-800 dark:text-emerald-200">
                <i class="fas fa-check-circle"></i>
                Verified User
                </div>
            </div>

            <!-- Status -->
            <div id="userStatus" class="text-center text-sm text-gray-400 mb-8">
                Connected • Last active just now
            </div>

            <!-- Registration date -->
            <div id="registrationDate" class="text-center text-sm text-gray-400 mb-8"></div>
            <div id="emailVerification" class="text-center text-sm text-gray-400 mb-8"></div>
            

            <!-- Update Name Form -->
            <form id="updateNameForm" class="space-y-4">
                <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-600">Display Name</label>
                <input type="text" id="newName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-500"
                    placeholder="Enter new name">
                </div>
                <button type="button" id="updateNameBtn"
                    class="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 
                    hover:to-teal-600 text-white font-semibold py-3.5 rounded-2xl transition-all 
                    duration-200 shadow-sm dark:from-emerald-700 dark:to-teal-800">
                Update Name
                </button>
            </form>

            <!-- Logout Button -->
            <button type="button" id="logoutBtn"
                    class="mt-6 w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3.5 rounded-2xl 
                    transition-colors flex items-center justify-center gap-2 dark:bg-gray-600 dark:border-gray-500 dark:text-red-400">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </button>
        </div>
        </div>
    </div>
    `;
    renderProfileData();
    setAvatar();
}
