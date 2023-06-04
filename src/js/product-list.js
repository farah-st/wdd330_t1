import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

const categoryId = getParam("category");
const orderById = getParam("name", "FinalPrice");

loadHeaderFooter();
productList(".product-list", categoryId, orderById);
