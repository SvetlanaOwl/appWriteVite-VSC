import '../css/utils.css'
import { themeSwitcher } from '../js/themeSwitcher.js'

import deleteFruits from './delete-fruits.js';


window.runClean = async () => {
    
try {
    const result = await deleteFruits();
    console.log("Успешно!", result);
  } catch (e) {
    console.error("Ошибка:", e);
  }
};

themeSwitcher();