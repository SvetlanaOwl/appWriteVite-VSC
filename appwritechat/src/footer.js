import { loadFooterMenu } from "./menu.js";

export function createFooter() {
    const footerSection = document.getElementById('footerSection');

    if (!footerSection) {
        console.error('footerSection element not found');
        return;
    }

    footerSection.innerHTML = `
        <!-- FOOTER -->
        <footer class="bg-white dark:bg-gray-800 dark:border-gray-700 border-t border-gray-100 mt-auto">
            <div class="max-w-6xl mx-auto px-6 py-10">

                <!-- Menu -->
                <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 xl:gap-28">
                    <div id="footer-col-1" class="px-4"></div>
                    <div id="footer-col-2" class="px-4"></div>
                    <div id="footer-col-3" class="px-4"></div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-gray-100 dark:border-gray-700 mt-1 pt-4 pb-4 text-center text-xs text-gray-500">
                © 2026 Wolf&Owl Hub. All rights reserved. Made with ❤️ for a better world.
            </div>
        </footer>
    `;

    // Load dynamic footer menu AFTER HTML is inserted
    loadFooterMenu();
}