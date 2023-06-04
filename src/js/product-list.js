import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

const categoryId = getParam("category");
const orderById = getParam("name", "FinalPrice");

loadHeaderFooter();
productList(".product-list", categoryId, orderById);

const sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", function(event) {
    const orderBy = event.target.value;
    productList(".product-list", categoryId, orderBy);
  });