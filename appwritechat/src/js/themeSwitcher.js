export function themeSwitcher() {
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
        }
    }

    // Toggle theme on click
    document.getElementById('themeToggle')?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');

        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}