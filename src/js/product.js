import { getParam, loadHeaderFooter, updateCartSuperscript } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails, { addProductToCart } from "./productDetails.mjs";

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  updateCartSuperscript();
  backpackAnimation();
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);


  // animation for backpack icon
function backpackAnimation(){
  let backpack = document.getElementsByClassName("backpack");
  
  let interval = setInterval(myInterval, 250);

  let i = 0;
  let pos = 10;
    function myInterval(){
  backpack[0].style.backgroundColor = backpack[0].style.backgroundColor == "green" ? "white" : "green";
  backpack[0].style.width = 30;
  //backpack[0].style.display = "active";

  backpack[0].style.top = pos + 'px';
  backpack[0].style.right = pos + 'px';
      pos += 25;
      i++;

      if (i == 18) {
        clearInterval(interval);
        backpack[0].style.backgroundColor = "white";
        backpack[0].style.width = 24;
        backpack[0].style.top = 34 + 'px';
        backpack[0].style.right = -15 + 'px';
      }
  }
}

// search product
const productID = getParam("product");
productDetails(productID);

loadHeaderFooter();
updateCartSuperscript();
