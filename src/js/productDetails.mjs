import { getLocalStorage, renderWithTemplate, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { backpackAnimation, getParam } from "./utils.mjs";
import { formDataToJSON } from "./checkoutProcess.mjs";

// Main function
export default async function productDetails(productId) {
    try {
      const product = await findProductById(productId);
      if (product === undefined) {
        throw Error();
      }
      const productComment = document.querySelector(".commentform");
      const productDetails = document.querySelector(".product-detail");
      await renderWithTemplate(productDetailsTemplate,productDetails,product);
      // add listener to Add to Cart button
      document.getElementById("addToCart").addEventListener("click", addToCartHandler);
      document.getElementById("submit-comment").addEventListener("click", addComment);
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
          <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
          <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
          <div class="product-detail__add">
            <button id="addToCart">Add to Cart</button>
          </div>
            <form name="comment" class="grid">
          <div class="commentform">
            <fieldset>
            <p></p>
            <label for="comment" > Add a Comment </label>
            <input type="text" placeholder="add comment here" name="comment" data-id=${product.Id}>
            </fieldset>
            <button type="submit" id="submit-comment">Submit</button>
          </div>
          </form>
          <div class="seeComments">
          <h3>Review</h3>
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


 function addComment(e) {
  e.preventDefault();
  const comments = getLocalStorage("so-comment");
  if ((getLocalStorage("so-comment") === null)) {
    setLocalStorage("so-comment", []);
    console.log(getLocalStorage("so-comment"))
  };
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  if (chk_status) {
    const json = formDataToJSON(document.forms["comment"]);
    json.todays_date = new Date();
    json.id = document.querySelector('input').dataset.id;
    
    console.log(setLocalStorage("so-comment"))
    setLocalStorage("so-comment", [json]);
  }
      
  else {
    console.log("TT")
    Array.from(myForm.querySelectorAll(":invalid"))
      .filter((item) => {
        let fieldsetPresent = item.tagName.toLowerCase() !== "fieldset";
        return fieldsetPresent;
      })
      .reverse()
      .map((item) => {
        alertMessage(item.dataset.name);
      });
  }
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

