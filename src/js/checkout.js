import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

document.querySelector("#checkout").addEventListener("click", (e) => {
  e.preventDefault();

  checkoutProcess.checkout(document.forms["checkout"]);
});
