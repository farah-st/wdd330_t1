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
  myForm.reportValidity();
  if (chk_status){
    checkoutProcess.checkout(document.forms["checkout"]);
  } else {
    let message = myForm.querySelectorAll(":invalid");
    console.log(message)
    alertMessage(message)
  }
    
    
});
