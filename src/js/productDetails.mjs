import { getLocalStorage, renderWithTemplate, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

// Main function
export default async function productDetails(productId) {
    try {
      const product = await findProductById(productId);
      if (product === undefined) {
        throw Error();
      }
      const productDetails = document.querySelector(".product-detail");
      renderWithTemplate(productDetailsTemplate,productDetails,product);
    } catch {
      const productDetails = document.querySelector(".product-detail");
      renderWithTemplate(productNotFoundTemplate,productDetails);
    }
    
};

function productDetailsTemplate(product){
  return `
          <h3 id="productName">${product.Name}</h3>
          <h2 class="divider" id="productNameWithoutBrand">${product.Brand.Name}</h2>
          <img id="productImage" class="divider" src="${product.Images.PrimaryLarge}" alt="${product.Name}">
          <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
          <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
          <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
          <div class="product-detail__add">
            <button id="addToCart" data-id="">Add to Cart</button>
          </div>
          `
};

function productNotFoundTemplate(){
  return `
        <h2>Product not Found!</h2>
        <p>The item you requested is not available
        for purchase</p>
        <a href="/">
                <button>Return to Shop</button>
        </a>
          `
}

// add product to cart
export function addProductToCart(product) {

    //Creates a new cart if empty
    if ((getLocalStorage("so-cart") === null)) {
      const newCart = [];
      setLocalStorage("so-cart", newCart);
    } 
    const cart = getLocalStorage("so-cart");
    cart.push(product);
    setLocalStorage("so-cart", cart);
  }