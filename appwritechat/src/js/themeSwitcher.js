export function themeSwitcher() {
    const icon = document.getElementById('icon');

    // Restore theme on page load
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        // No saved preference → follow system
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            if (icon) icon.className = 'fa-regular fa-sun';
        }
    }

    // Toggle theme on click
    document.getElementById('themeToggle')?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Update icon immediately
        icon.className = isDark
        ? "fa-regular fa-sun"
        : "fa-regular fa-moon";
    });
}