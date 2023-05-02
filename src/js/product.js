import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import { findProductById, getData } from "./productData.mjs";

// add product to cart
function addProductToCart(product) {
  const cart = getLocalStorage("so-cart");
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  getParam();

  