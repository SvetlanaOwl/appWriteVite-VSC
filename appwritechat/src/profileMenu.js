export function initProfileMenu() {
    const profileToggle = document.getElementById("profileToggle");
    const profileMenu = document.getElementById("profileMenu");

    profileToggle.addEventListener("click", () => {
        profileMenu.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        const wrapper = document.getElementById("profileWrapper");
        if (!wrapper.contains(e.target)) {
            profileMenu.classList.add("hidden");
        }
    });
}