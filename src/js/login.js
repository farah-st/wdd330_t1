import { getParam, loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "./auth.mjs"; 
checkLogin();
loadHeaderFooter();
const redirect = getParam("redirect");

document.getElementById("login-button").addEventListener("click", (e) => {
    
})
