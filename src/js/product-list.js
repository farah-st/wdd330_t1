import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

const categoryId = getParam("category");

loadHeaderFooter();
productList(".product-list", categoryId, orderBy);
