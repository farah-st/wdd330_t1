import { loadHeaderFooter, getParam, addBreadcrumbs } from "./utils.mjs";
import productList from "./productList.mjs";


const categoryId = getParam("category");

loadHeaderFooter();
addBreadcrumbs();
productList(".product-list", categoryId);

const sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", function (event) {
  const orderBy = event.target.value;
  productList(".product-list", categoryId, orderBy);
});

const searchBox = document.querySelector("#search-box");
searchBox.addEventListener("input", () => {
  let sortElement = document.querySelector("#sort-div");
  if (searchBox.value == "") {
    sortElement.style.display = "block";
  } else {
    sortElement.style.display = "none";
  }
  productList(".product-list", categoryId, null, searchBox.value);
});
