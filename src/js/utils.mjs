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

export function addBreadcrumbs() {
  
  const breadCr = document.getElementById("breadcrumbs");
  const breadCrumbsParagraph = document.createElement("p");
  const node = document.createTextNode("Home");
  breadCrumbsParagraph.appendChild(node);
    console.log(breadCr)
  breadCr.appendChild(breadCrumbsParagraph);

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

  