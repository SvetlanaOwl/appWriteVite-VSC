import {client, account, databases, query, IDHelper, MDBID, MSGID } from '../appwrite/appwriteClient';
//Replace with your actual DB + collection IDs
const DB_ID = MDBID;
const MESSAGES_ID = MSGID;

export async function initChat() { //main function to initialize the chat window
    try {
        const user = await account.get();

        setupRealtime();
        await loadExistingMessages();
        setupSendHandler(user);
    } catch (err) {
        console.error('Chat init error:', err);
    }
}
//
// Load existing messages
//
async function loadExistingMessages() {
    try {
        const res = await databases.listDocuments(
            DB_ID,
            MESSAGES_ID, [
            query.orderAsc("$createdAt")
            ]);
        
        res.documents.forEach(renderMessage);
    } catch (err) {
        console.error("Error loading messages:", err);
    }
}
// ------
// Realtime subscription
// ------
function setupRealtime() {
    client.subscribe(
        `databases.${DB_ID}.collections.${MESSAGES_ID}.documents`,
        (response) => {
            if (response.events.some(e => e.endsWith(".create"))) {
                renderMessage(response.payload);
            }
        }
    );
}
//
// Sending messages
//
function setupSendHandler(user) {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        try {
            await databases.createDocument(DB_ID, MESSAGES_ID, IDHelper.unique(), {
                userid: user.$id,
                username: user.name,
                body: text,
                $createdAt: new Date().toISOString()
            });
        
            input.value = '';

        } catch (err) {
            console.error('Error sending message:', err);
        }
    });
}
//
// Rendering messages
//
function renderMessage(msg) {
    const container = document.getElementById('chat-messages'); // Получаем контейнер сообщений
    const div = document.createElement('div'); // Создаем новый элемент div для отображения сообщения

    div.className = "p-2 rounded bg-gray-100 dark:text-white dark:bg-gray-800 mb-2"; // Назначаем CSS-классы новому элементу

    // Заполняем внутренний HTML элемента информацией о сообщении
    div.innerHTML = `
    <!--<div class="text-xs opacity-60">${msg.username}</div>-->
    <div class='flex items-center gap-2 text-xs opasity-60'>
        <!--Avatar-->
        <div class='w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-[10px] font-semibold'>
            ${msg.username?.charAt(0).toUpperCase()}
        </div>

        <!--Icon BEFORE username-->
        <i class='fa-solid fa-heart text-red-400'></i>

        <!--Username-->
        <span>${msg.username}</span>

        <!--Icon AFTER username-->
        <i class='fa-solid fa-star text-green-500'></i>
    </div>
    <div>${msg.body}</div>
    <div class='text-[.45rem] dark:text-red-300'>${msg.$createdAt}</div>
    `;

    container.appendChild(div); // Добавляем созданный элемент в контейнер сообщений

    // Прокручиваем контейнер сообщений в самое низ, чтобы новое сообщение было видимым
    container.scrollTop = container.scrollHeight;
}
