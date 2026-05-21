import './css/utils.css' 
import { themeSwitcher } from './js/themeSwitcher.js'
import { createHeader } from './header.js'
import { createProfileCard } from './profile.js'
import { createFooter } from './footer.js'
import { updateAccountName } from './js/appwriteUtils.js'

createHeader();
themeSwitcher();
createProfileCard();
createFooter();
updateAccountName();

