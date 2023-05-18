import { getParam, loadHeaderFooter, updateCartSuperscript } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails, { addProductToCart } from "./productDetails.mjs";

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  
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
  backpack[0].style.position = "absolute";
  backpack[0].style.top = pos + 'px';
  backpack[0].style.right = pos + 'px';
      pos += 25;
      i++;

      if (i == 18) {
        backpack[0].style.position = "relative";
        clearInterval(interval);
        backpack[0].style.backgroundColor = "white";
        backpack[0].style.top = 0 + 'px';
        backpack[0].style.right = 0 + 'px'; 

        updateCartSuperscript();
      }
      
  }
  
}

// search product
const productID = getParam("product");
productDetails(productID);

loadHeaderFooter();
updateCartSuperscript();
