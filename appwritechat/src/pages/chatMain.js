import '../css/utils.css'
import '../css/chatRoom.css' 
import { themeSwitcher } from '../js/themeSwitcher.js' 
import { simulateChat } from '../js/chatSimulator.js';
import { displayUser, setupEmojiPicker } from '../js/chatUtils.js';

themeSwitcher();
displayUser();
simulateChat();
setupEmojiPicker({buttonId: 'emoji-button', panelId: 'emoji-panel', animated: false }); //Stattic emojis
setupEmojiPicker({buttonId: 'animatedEmoji-button', panelId: 'animatedEmoji-panel', animated: true}); //animated emojis (gifs or webp)
