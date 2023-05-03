import { getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails, {addProductToCart} from "./productDetails.mjs";

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// search product 
const productID = getParam("product");
productDetails(productID);

  