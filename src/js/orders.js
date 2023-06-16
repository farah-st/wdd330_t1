import { checkLogin } from "./auth.mjs";
import { displayOrder } from "./currentOrders.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
const token = checkLogin();
const selector = document.querySelector("#order-list");
displayOrder(token, selector);
