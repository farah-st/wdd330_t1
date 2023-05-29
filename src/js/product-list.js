import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";
import displayProducts from "./productList.mjs";

const categoryId = getParam("category");

productList(".product-list", categoryId, 4);
loadHeaderFooter();

displayProducts();
