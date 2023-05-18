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
  const cartSuperscript = document.getElementById("cart-superscript");
  const cart = getLocalStorage("so-cart");
  cartSuperscript.innerHTML = cart.length;
}

export function renderListWithTemplate (templateFn, parentElement, list, position = "afterbegin", clear = true, productToRender = 4){
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

export function loadHeaderFooter() {

   const headerTemplateFn = loadTemplate("/partials/header.html");
   
   const footerTemplateFn = loadTemplate("/partials/footer.html");

   const headerE1 = document.querySelector("header");
   const footerE1 = document.querySelector("footer");
   renderWithTemplate(headerTemplateFn, headerE1, null, updateCartSuperscript);
   renderWithTemplate(footerTemplateFn, footerE1);
}
  