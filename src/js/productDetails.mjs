import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

// Main function
export default async function productDetails(productId) {
    const product = await findProductById(productId);
    renderProductDetails(product)
};

// Fill the details for the current product in the HTML
function renderProductDetails(product){
    const productName = document.getElementById("productName");
    const productNameWithoutBrand = document.getElementById("productNameWithoutBrand");
    const productImage = document.getElementById("productImage");
    const productFinalPrice = document.getElementById("productFinalPrice");
    const productColorName = document.getElementById("productColorName");
    const productDescriptionHtmlSimple = document.getElementById("productDescriptionHtmlSimple");
    const addToCart = document.getElementById("addToCart");

    productName.innerHTML = product.Name;
    productNameWithoutBrand.innerHTML = product.Brand.Name;
    productImage.src = product.Image;
    productImage.alt = product.Name;
    productFinalPrice.innerHTML = product.FinalPrice;
    productColorName.innerHTML = product.Colors[0].ColorName;
    productDescriptionHtmlSimple.innerHTML = product.DescriptionHtmlSimple;
    addToCart.setAttribute("data-id", product.Id)
};





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