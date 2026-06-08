import { getFormData } from "./appwriteUtils.js";

export async function loadData() {
    const container = document.getElementById('form-data');
    const data = await getFormData();

    if (data.length === 0) {
        container.innerHTML = "<p> No submissions found.</p>";
        return;
    }
    
    /*const tableHTML = `
        <div class="overflow-x-auto">
            <table class="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr class="bg-gray-100 border-b">
                        <th class="px-6 py-4 text-left font-semibold text-gray-700">Имя</th>
                        <th class="px-6 py-4 text-left font-semibold text-gray-700">Фамилия</th>
                        <th class="px-6 py-4 text-left font-semibold text-gray-700">Страна</th>
                        <th class="px-6 py-4 text-left font-semibold text-gray-700">Цвет глаз</th>
                        <th class="px-6 py-4 text-left font-semibold text-gray-700">Возраст</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    ${data.map(item => `
                        <tr class="bg-gray-500 transition-colors">
                            <td class="px-6 py-4">${item.name}</td>
                            <td class="px-6 py-4">${item.lastName}</td>
                            <td class="px-6 py-4">${item.country}</td>
                            <td class="px-6 py-4">${item.eye}</td>
                            <td class="px-6 py-4 font-medium">${item.age}</td>
                        </tr>
                    `)
                    .join('')
                    }
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = tableHTML;
}
*/    
    container.innerHTML = data
    .map(
      (item) =>`
            <div class="card">
                <p><strong>Name:</strong> ${item.name} ${item.lastName}</p>
                <p><strong>Country:</strong> ${item.country}</p>
                <p><strong>Eye Color:</strong> ${item.eye}</p>
                <p><strong>Age:</strong> ${item.age}</p>
            </div>
        `
    )
    .join("");
}