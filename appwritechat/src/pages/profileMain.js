import '../css/utils.css' 
import { themeSwitcher } from '../js/themeSwitcher.js' 
import { createHeader } from '../js/header.js'
import { createProfileCard } from '../js/profile.js'
import { createFooter } from '../js/footer.js'
import { updateAccountName } from '../js/appwriteUtils.js'

createHeader();
themeSwitcher();
createProfileCard();
createFooter();
updateAccountName();

