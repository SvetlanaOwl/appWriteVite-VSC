//Render users into HTML
export function renderUsers(users) {
    const container = document.getElementById('userList');
    container.innerHTML = "";

    if (users.length === 0) {
        container.innerHTML = "<p class='text-center text-gray-500 dark:text-gray-400 py-4'>No users found</p>";
        return;
    }

    // Create table structure
    const table = document.createElement("table");
    table.className = "w-full text-left border-collapse";

    // Table header
    const thead = document.createElement("thead");
    thead.className = "bg-gray-50 dark:bg-gray-700/50";
    thead.innerHTML = `
        <tr class="text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <th class="px-6 py-3 font-medium">Name</th>
            <th class="px-6 py-3 font-medium">Email</th>
            <th class="px-6 py-3 font-medium">Roles</th>
            <th class="px-6 py-3 font-medium">Status</th>
            <th class="px-6 py-3 font-medium text-center">Actions</th>
        </tr>
    `;

    table.appendChild(thead);

    // Table body
    const tbody = document.createElement("tbody");

    users.forEach(u => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition";

        tr.innerHTML = `
            <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                ${u.name || "(no name)"}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                ${u.email}
            </td>
            <td class="px-6 py-4 text-sm">
                ${u.roles && u.roles.length > 0 
                    ? u.roles.map(role => 
                        `<span class="px-2 py-1 rounded-full text-xs font-medium 
                        ${role === 'admin' 
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'}">
                                ${role}
                            </span>`
                    ).join(' ')
                    : '<span class="text-gray-400">No roles</span>'
                }
            </td>
            <td class="px-6 py-4 text-sm">
                <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Active
                </span>
            </td>
            <td class="px-6 py-4 text-sm">
                <div class="flex items-center justify-center gap-2">
                    <button class="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="p-2 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-lg transition" title="${u.roles?.includes('admin') ? 'Remove Moderator' : 'Make Moderator'}">
                        <i class="fa-solid ${u.roles?.includes('admin') ? 'fa-user-shield' : 'fa-user-plus'}"></i>
                    </button>

                    <button class="p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 rounded-lg transition" title="Make VIP">
                        <i class="fa-solid fa-crown"></i>
                    </button>
                    <button class="p-2 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20 rounded-lg transition" title="Send to Prison">
                        <i class="fa-solid fa-handcuffs"></i>
                    </button>
                    <button class="p-2 text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20 rounded-lg transition" title="Ban User">
                        <i class="fa-solid fa-ban"></i>
                    </button>
                    <button class="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}