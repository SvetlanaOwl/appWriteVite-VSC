import { renderHeader } from './menu.js';
import { initProfileMenu } from './profileMenu.js';
import { logout } from './js/appwriteUtils.js';
import { burgerMenu } from './burgerMenu.js';

export function createHeader() {
    const headerSection = document.getElementById('headerSection');
    if (!headerSection) {
        console.error('headerSection element not found');
        return;
    }

    // Main header structure using template literal (much cleaner)
    headerSection.innerHTML = `
        <header class="bg-white shadow-sm border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <!-- Logo -->
                <a href="/" class="flex items-center gap-3 group">
                <div class="w-9 h-9 bg-gradient-to-br from-[#74ebd5] to-[#ACB6E5] rounded-2xl
                    flex items-center justify-center text-white font-bold text-2xl
                    shadow-inner transition-transform group-hover:scale-105">
                    W
                </div>
                <span class="font-semibold text-2xl tracking-tight text-gray-800 group-hover:text-gray-900 dark:text-slate-500 dark:group-hover:text-slate-400">
                    Wolf&Owl Hub
                </span>
                </a>

                <!-- Navigation -->
                <nav id="header-nav" class="hidden md:flex items-center gap-8 text-gray-600 dark:text-slate-400 font-medium">
                <!-- You can populate this dynamically if needed -->
                </nav>

                <!-- Right side -->
                <div class="flex items-center gap-4">

                    <!-- Search -->
                    <div class="relative hidden sm:block">
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Search users…"
                            class="bg-gray-100 border border-transparent focus:border-gray-300 w-72 pl-10 py-2.5 
                            rounded-3xl text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:focus:border-gray-500">
                        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>

                    <!-- Night mode toggle -->
                    <button id="themeToggle" class="p-2 rounded">
                        <!-- Light mode icon (moon) -->
                        <svg id="iconMoon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                        </svg>
                        <!-- Dark mode icon (sun) -->
                        <svg id="iconSun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden dark:block text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" />
                        </svg>
                    </button>

                    <!-- Profile -->
                    <div id="profileWrapper" class="relative">
                        <div id="profileToggle" class="flex items-center gap-3 cursor-pointer select-none">
                            <div class="w-9 h-9 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                                <img id="profileImage"
                                src="./img/wolf.jpg"
                                alt="Profile Picture"
                                class="w-full h-full object-cover">
                            </div>
                            <div class="hidden md:block">
                                <p id="profileName" class="text-sm font-semibold text-gray-800 leading-none dark:text-slate-500">
                                Username
                                </p>
                            </div>
                        </div>
                    
                        <!-- Profile Dropdown -->
                        <div id="profileMenu" class="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-2xl py-2 border border-gray-100 hidden dark:bg-gray-800 dark:border-gray-700">

                            <a href="./profile.html" 
                            class="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-gray-700 transition-colors">
                                Profile
                            </a>

                            <button id="logoutBtn" 
                                    class="w-full text-left block px-5 py-2.5 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700 transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>

                    <!-- Hamburger Menu Button -->
                    <button id="mobileMenuBtn" 
                            class="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <i class="fas fa-bars text-xl text-gray-700 dark:text-slate-300"></i>
                    </button>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden md:hidden mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <nav id="mobile-nav" class="flex flex-col gap-4 text-gray-600 dark:text-slate-400 font-medium">
                    <!-- You can populate this dynamically (same links as desktop) -->
                </nav>
        
                <!-- Mobile Search -->
                <div class="relative mt-6 md:hidden">
                    <input 
                        type="text" 
                        id="mobileSearchInput"
                         placeholder="Search users..."
                        class="bg-gray-100 border border-transparent focus:border-gray-300 w-full pl-10 py-3 rounded-3xl 
                        text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:focus:border-gray-500">
                        
                    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>
        </header>
    `;

    // Initialize functionality after DOM is inserted
    renderHeader();
    initProfileMenu();
    logout();
    burgerMenu();
}

