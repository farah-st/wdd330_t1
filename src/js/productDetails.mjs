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
      const productSeeComment = document.querySelector(".seeComments");
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






        console.log(document.querySelector(".extra-images"))

        let slideIndex = 1;
        showSlides(slideIndex);

        
        function showSlides(n) {
          let i;
          let slides = document.querySelector(".product-extra-images");
          if (n > slides.length) {slideIndex = 1}    
          if (n < 1) {slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
          }
          slides[slideIndex-1].style.display = "block"; 
        }





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
          <div class="product-colors">${displayColors(product.Colors)}</div>
          <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>

          <div class="extra-images">
          ${displayExtraImages(product.Images.ExtraImages)}
          <a class="prev" onclick="plusSlides(-1)"><</a>
          <a class="next" onclick="plusSlides(1)">></a>
          </div>


          <div class="product-detail__add">
            <button id="addToCart">Add to Cart</button>
          </div>

          <form name="comment" class="grid">
          <div class="commentform">
            <fieldset>
            <p></p>
            <label for="comment" > Add a Comment </label>
            <input type="text" placeholder="add comment here" class="CommentInput" name="comment" data-id=${product.Id}>
            </fieldset>
            <button type="submit" id="submit-comment">Submit</button>
          </div>
          </form>
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

function displayExtraImages(ExtraImages){
 
  const htmlElements = ExtraImages.map((item)=>{
  
    return `
        <div class="product-extra-images">
              <img
                src="${item.Src}"
                alt="${item.Title}"
                class="carousel" > 
           </div>
            `
  });


  return htmlElements.join("");
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


export async function showComments(product) {

  const showComment = getLocalStorage("so-comment");
  for(let i = 0; i < showComment.length; i++) {
    
     if (showComment[i].id == product) {

     const commentss = document.getElementById("displayComment");
     const Paragraph = document.createElement("p");
     const node = document.createTextNode(showComment[i].comment);
     Paragraph.appendChild(node);
     commentss.appendChild(Paragraph);

     }
  }

}

function addComment(e) {
  e.preventDefault();
  if ((getLocalStorage("so-comment") == null)) {
    setLocalStorage("so-comment", []);
  };
  const comments = getLocalStorage("so-comment");
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  if (chk_status) {

    const json = formDataToJSON(document.forms["comment"]);
    json.todays_date = new Date();
   
     json.id = document.querySelector('.CommentInput').dataset.id;
    comments.push(json);
    setLocalStorage("so-comment", comments);
    window.location.reload();



  } else {
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

//console.log(document.querySelector("product-colors"))
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

 
// function showSlides(n) {
//   let i;
//   let x = document.querySelector(".carousel");
  
  
//   // if (n > x.length) {slideIndex = 1}    
//   // if (n < 1) {slideIndex = x.length}
//   // for (i = 0; i < x.length; i++) {
//   //    x[i].style.display = "none";  
//   // }
//   // console.log(x.length)
// // x[slideIndex-1].style.display = "block"; 
// }

