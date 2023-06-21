import { isTokenValid } from "./auth.mjs";
import { getProductsByCategory, findProductById } from "./externalServices.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function updateCartSuperscript (){
  try{
    const cartSuperscript = document.getElementById("cart-superscript");
    const cart = getLocalStorage("so-cart");
    if (cart === null) {
      cartSuperscript.innerHTML = 0;
    } else {
      cartSuperscript.innerHTML = cart.length;
    }
    
  } catch (error) {
      console.log(error);
  }
}

// animation for backpack icon
export function backpackAnimation() {
  let backpack = document.getElementsByClassName("backpack");

  let interval = setInterval(myInterval, 250);

  let i = 0;
  let pos = 10;
  function myInterval() {
    backpack[0].style.backgroundColor =
      backpack[0].style.backgroundColor == "green" ? "white" : "green";
    backpack[0].style.position = "absolute";
    backpack[0].style.top = pos + "px";
    backpack[0].style.right = pos + "px";
    pos += 150;
    i++;

    if (i == 5) {
      backpack[0].style.position = "relative";
      clearInterval(interval);
      backpack[0].style.backgroundColor = "white";
      backpack[0].style.top = 0 + "px";
      backpack[0].style.right = 0 + "px";

      updateCartSuperscript();
    }
  }
}

export async function addBreadcrumbs() {

  // get the list of products 
  const categoryId = getParam("category");
  const cat = await getProductsByCategory(categoryId);
  const breadCr = document.getElementById("breadcrumbs");
  const breadCrumbsParagraph = document.createElement("p");
  const node = document.createTextNode(categoryId + " >> " + cat.length + " Items");
  breadCrumbsParagraph.appendChild(node);
  breadCr.appendChild(breadCrumbsParagraph);

  if (categoryId == null) { 
    let removeBread = document.getElementById("breadcrumbs");
    removeBread.removeChild(breadCrumbsParagraph);

    const getproductId = getParam("product");
    const product = await findProductById(getproductId);

 const breadCrumbsParagraph2 = document.createElement("p");
    const node = document.createTextNode(product.Category);
  breadCrumbsParagraph2.appendChild(node);
  breadCr.appendChild(breadCrumbsParagraph2);
  }
}


export function renderListWithTemplate (templateFn, parentElement, list, position = "afterbegin", clear = true){
// Renders products using a template

  // If clear is true, then clean the parentElement
  if (clear) parentElement.innerHTML = "";

  // creates an Array with the templates joining the product info
  const htmlArray =  list.map(templateFn);

  // joins the array and injects the HTML into the parentElement
  parentElement.insertAdjacentHTML(position,htmlArray.join(''));

}


export async function renderWithTemplate (templateFn,
                                    parentElement,
                                    data,
                                    callback,
                                    position = "afterbegin",
                                    clear = true){
  // Renders products using a template
  
    // If clear is true, then clean the parentElement
    if (clear) parentElement.innerHTML = "";
  
    const htmlData =  await templateFn(data);

    parentElement.insertAdjacentHTML(position, htmlData);
    if(callback) {
        callback(data);
    }
}

function loadTemplate(path) {
  return async function () {
    const response = await fetch(path);
    if (response.ok) {
    const html = await response.text();
    return html;
    }
  }
}

export async function loadHeaderFooter(userLogin=true) {

   const headerTemplateFn = loadTemplate("/partials/header.html");
   
   const footerTemplateFn = loadTemplate("/partials/footer.html");

   const headerE1 = document.querySelector("header");
   const footerE1 = document.querySelector("footer");
   
   await renderWithTemplate(headerTemplateFn, headerE1, null, updateCartSuperscript);
   await renderWithTemplate(footerTemplateFn, footerE1);
   
   if(userLogin){
    const userInterface = document.querySelector("#user-interface");
    displayUserInterface(userInterface);
   };
}
  
function displayUserInterface(selector){
  const token = getLocalStorage("so_token")
  
  if(isTokenValid(token)){
    selector.innerHTML = `<button id="order-button">Orders</button>`;
    document.querySelector("#order-button").addEventListener("click", ()=>{
      window.open(`/orders/index.html`, "_blank").focus();

    
     })
  } else {
    selector.innerHTML = `<button id="login-button">Login</button>`;
    document.querySelector("#login-button").addEventListener("click", ()=>{
      window.open(`/login/index.html?redirect=${location.pathname}`, "_blank").focus()})
  }
}

export function alertMessage(message, scroll = true){
    // create element to hold our alert
    const alert = document.createElement("div");
    // add a class to style the alert
    alert.classList.add("alert");
    // set the contents. You should have a message and an X or something the user can click on to remove
    const textAlert = document.createElement("p");
    const exitButton = document.createElement("button");
    
    textAlert.textContent = `Invalid ${message}`;
    exitButton.textContent = "X"
    
    // add a listener to the alert to see if they clicked on the X
    // if they did then remove the child
    exitButton.addEventListener("click", function(e) {
        if(e.target.tagName) { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
          main.removeChild(this.parentNode);
        }
    })

    alert.prepend(textAlert);
    alert.prepend(exitButton);
    // add the alert to the top of main
    const main = document.querySelector("main");
    main.prepend(alert);
    // make sure they see the alert by scrolling to the top of the window
    //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
    if(scroll)
      window.scrollTo(0,0);
}