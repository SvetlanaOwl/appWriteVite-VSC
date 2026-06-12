import '../css/utils.css'
import { requireAdmin } from '../js/appwriteUtils.js'
import { loadData } from '../js/formatForm.js'
import { themeSwitcher } from '../js/themeSwitcher.js'

requireAdmin();
themeSwitcher();
loadData();
