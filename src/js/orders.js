import { checkLogin } from "./auth.mjs";
import { displayOrder } from "./currentOrders.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
const token = checkLogin();
const table = document.querySelector("#order-list");
displayOrder(token, table);
