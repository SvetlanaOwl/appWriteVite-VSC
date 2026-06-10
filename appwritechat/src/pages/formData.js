import '../css/utils.css'
import { loadData } from '../js/formatForm.js'
import { requireAdmin } from '../js/appwriteUtils.js'
import { themeSwitcher } from '../js/themeSwitcher.js'


themeSwitcher();
loadData();
requireAdmin();