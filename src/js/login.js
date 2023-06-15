import { getParam, loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "./auth.mjs"; 
import { formDataToJSON } from "./checkoutProcess.mjs";
import { loginRequest } from "./externalServices.mjs";
checkLogin();
loadHeaderFooter();

const redirect = getParam("redirect");

document.getElementById("login-button").addEventListener("click", (e) => {
    const form = document.forms["login"];
    const jsonForm = formDataToJSON(form);
    loginRequest(jsonForm);
})
