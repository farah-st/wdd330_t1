import { alertMessage, loadHeaderFooter } from "./utils.mjs";
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
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  if (chk_status) {
    checkoutProcess.checkout(document.forms["checkout"]);
  } else {
    Array.from(myForm.querySelectorAll(":invalid"))
      .filter((item) => {
        return item.tagName.toLowerCase() !== "fieldset";
      })
      .reverse()
      .map((item) => {
        alertMessage(item.dataset.name);
      });
  }
});
