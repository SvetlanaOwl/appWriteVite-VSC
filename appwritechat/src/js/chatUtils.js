import { account } from "../appwrite/appwriteClient.js";
//Function to check if the user is logged in and display their username
export async function displayUser() {
    account.get()
    .then(response => {
        document.getElementById('profileUsername').innerText = `${response.name}`;
        })
        .catch(error => {
            console.log('User not logged in:', error);
            document.getElementById('profileUsername').innerHTML =
            'User not logged in.<br><small>Error: ' + error.message + '</small>';
        });
}

// Утилита для размещения курсора в конце contenteditable элемента (используется после вставки эмодзи, чтобы курсор был в конце текста)
function placeCaretAtEnd(el) {
    el.focus();   // Делаем элемент активным (фокус)
    const range = document.createRange();  //Создаём новый Range (диапазон выделения)
        range.selectNodeContents(el);   //Выделяем всё содержимое элемента
        range.collapse(false);   //Перемещаем курсор в самый конец содержимого  false = в конец, true = в начало
    const sel = window.getSelection(); //Получаем текущее выделение (Selection)
        sel.removeAllRanges();  //Удаляем все предыдущие выделения
        sel.addRange(range);  //Добавляем наш новый диапазон (курсор в конце)
}

/**
 * Универсальная функция для настройки выбора эмодзи
 * Можно использовать для обычных эмодзи и для анимированных (GIF)
 * 
 * Пример использования:
 * setupEmojiPicker('emoji-button', 'emoji-panel', false);        // обычные эмодзи
 * setupEmojiPicker('animatedEmoji-button', 'animatedEmoji-panel', true); // анимированные
 * @param {Object} config - configuration object
 * @param {string} config.buttonId - ID кнопки, которая открывает панель
 * @param {string} config.panelId - ID панели с эмодзи
 * @param {boolean} config.animated - true = анимированные эмодзи (GIF), false = обычные
 */

export function setupEmojiPicker({
    buttonId = 'emoji-button',      // ID кнопки, открывающей панель
    panelId = 'emoji-panel',        // ID панели с эмодзи
    animated = false                // true = анимированные эмодзи (GIF), false = обычные
} = {}) {
    // Находим нужные элементы на странице
    const emojiButton = document.querySelector(`#${buttonId}`);
    const emojiPanel = document.querySelector(`#${panelId}`);
    const chatInput = document.querySelector('#chat-input');

    // Проверка наличия элементов
    if (!emojiButton || !emojiPanel || !chatInput) {
        console.warn(`Emoji picker elements not found for button: ${buttonId}`);
        return;
    }

    // Предотвращаем добавление новой строки при нажатии Enter (только отправка сообщения)
if (!chatInput.dataset.enterHandlerAdded) {
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Опционально: здесь можно сразу отправить сообщение
        }
    });

    chatInput.dataset.enterHandlerAdded = 'true';
}

// Переключение панели + позиционирование
emojiButton.addEventListener('click', (e) => {
    e.stopPropagation();                    // предотвращаем всплытие события
    emojiPanel.classList.toggle('hidden');  // показываем/скрываем панель

    // Позиционируем панель над кнопкой
    const rect = emojiButton.getBoundingClientRect();
    emojiPanel.style.top = `${rect.top - emojiPanel.offsetHeight - 8}px`;
    emojiPanel.style.left = `${rect.left}px`;
});
// Вставка эмодзи (обычных или анимированных)
emojiPanel.addEventListener('click', (e) => {
    
    if (animated) {
        // Обработка анимированных эмодзи (GIF)
        const img = e.target.closest('img');
        if (img) {
            const newImg = document.createElement('img');
            newImg.src = img.src;
            newImg.className = "w-6 h-6 inline-block align-middle";
            newImg.alt = img.alt || 'animated emoji';

            chatInput.appendChild(newImg);
            placeCaretAtEnd(chatInput);   // ставим курсор в конец
            chatInput.focus();
            return;
        }
    } 
    else {
        // Обработка обычных эмодзи
        const emoji = e.target.textContent?.trim();
        if (emoji && /\p{Emoji}/u.test(emoji)) {   // проверка, что это эмодзи
            chatInput.innerHTML += emoji;
            placeCaretAtEnd(chatInput);   // ставим курсор в конец
            chatInput.focus();
        }
    }
});
// Закрытие панели эмодзи при клике вне её области
document.addEventListener('click', (e) => {
    // Если клик был не по самой панели И не по кнопке открытия — закрываем панель
    if (!emojiPanel.contains(e.target) && !emojiButton.contains(e.target)) {
        emojiPanel.classList.add('hidden');
    }
});
}