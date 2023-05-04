import { getLocalStorage } from "./utils.mjs";

const cartSuperscript = document.getElementById("cart-superscript");
const cart = getLocalStorage("so-cart");
cartSuperscript.innerHTML = cart.length;