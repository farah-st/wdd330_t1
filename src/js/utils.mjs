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
  const htmlArray =  list.map(templateFn).slice(0,productToRender);

  // joins the array and injects the HTML into the parentElement
  parentElement.insertAdjacentHTML(position,htmlArray.join(''));

}
