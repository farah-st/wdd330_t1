import { getLocalStorage, renderWithTemplate, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { backpackAnimation, getParam } from "./utils.mjs";

// Main function
export default async function productDetails(productId) {
    try {
      const product = await findProductById(productId);
      if (product === undefined) {
        throw Error();
      }
      const productDetails = document.querySelector(".product-detail");
      await renderWithTemplate(productDetailsTemplate,productDetails,product);
      
      const checkColor = document.querySelectorAll(".check-color");
      
      checkColor.forEach((item)=>{
          let quickView = document.querySelector(".quick-view");

          if (quickView == null) {
            item.addEventListener(
              "mouseover",
              async function(){
                                await renderWithTemplate(
                                                  displayColorTemplate,
                                                  productDetails,
                                                  item.dataset.preview,
                                                  undefined,
                                                  undefined,
                                                  false);
                                }
                                  )
            item.addEventListener(
              "mouseout",function(){
                document.querySelector(".quick-view").remove()
              })
              
            }
            else {
              quickView.remove();
            }
        })

      // add listener to Add to Cart button
      document.getElementById("addToCart").addEventListener("click", addToCartHandler);
    } catch {
      const productDetails = document.querySelector(".product-detail");
      renderWithTemplate(productNotFoundTemplate,productDetails);
    }
    
};

export function productDetailsTemplate(product){
  const smallerImage = product.Images.PrimarySmall;
  const mediumImage = product.Images.PrimaryMedium;
  const largerImage = product.Images.PrimaryLarge;
  return `
          <h3 id="productName">${product.Name}</h3>
          <h2 class="divider" id="productNameWithoutBrand">${product.Brand.Name}</h2>
          <img id="productImage" class="divider" src="${smallerImage}" 
          srcset="${smallerImage} 480w, ${mediumImage} 768w, ${largerImage} 1200w"
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
          alt="${product.Name}">
          
          <p class="product-card__price" id="productFinalPrice">$${product.FinalPrice}</p>
          <div class="product-colors">${displayColors(product.Colors)}</div>
          <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
          <div class="product-detail__add">
            <button id="addToCart">Add to Cart</button>
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

function displayColors(colorsList){
  const htmlElements = colorsList.map((item)=>{
    return `<div id="product-color-${item.ColorCode}">
              <input type="radio" id="${item.ColorCode}" name="color-option">
              <img
                src="${item.ColorChipImageSrc}"
                alt="${item.ColorName}"
                data-preview="${item.ColorPreviewImageSrc}"
                class="check-color"> 
              ${item.ColorName}
            </div>
            `
  });
  return htmlElements.join("");
}

function displayColorTemplate(image){
  return `                  
            <img src="${image}"
            alt="Preview"
            class="quick-view color-quick-view">
          `
}

// add product to cart
export function addProductToCart(product) {
    //Creates a new cart if empty
    if ((getLocalStorage("so-cart") === null)) {
      setLocalStorage("so-cart", []);
    };
    const cart = getLocalStorage("so-cart");
    if (findDuplicatedProduct(cart,product.Id)){
      cart.find((item) => item.Id === product.Id).quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    setLocalStorage("so-cart", cart);
  }

function findDuplicatedProduct(product, id) {
  let finded = false;
  product.forEach(function(product) {
    if (product.Id === id) {
      finded = true;
    }
  });
  return finded;
}


async function addToCartHandler() {
  const productID = getParam("product");
  const product = await findProductById(productID);
  addProductToCart(product);
  backpackAnimation();
}

