import { updateCartSuperscript, loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

const categoryId = getParam("category");

productList(".product-list", categoryId, 4);
loadHeaderFooter();
updateCartSuperscript();