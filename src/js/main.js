import { updateCartSuperscript, loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";


productList(".product-list", "tents", 4);
loadHeaderFooter();
updateCartSuperscript();