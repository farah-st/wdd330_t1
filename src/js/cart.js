import { doc } from "prettier";
import {getData, findProductById} from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Creates a new cart if empty
// if (!(getLocalStorage("so-cart") === null)) {
//   renderCartContents();
// } else {
//   const newCart = [];
//   setLocalStorage("so-cart", newCart);
// }

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  const itemNum = cartItems.index;
  return itemNum;
 
}

function cartItemTemplate(item,index) {
  const newItem = `<li class="cart-card divider">
  
  <a href="#" class="cart-card__image">
  <span class="kill-product" data-id="${item.Id}">X ${item.Id}</span>
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

 renderCartContents();

// add listener to remove from Cart button
const removeItem = document.querySelectorAll(".kill-product");

//remove Item from cart
  removeItem.forEach(button => {
    button.addEventListener('click', function(element) {
    let cart = getLocalStorage("so-cart");
    const  {id}  = element.target.dataset;
      console.log(id);
      console.log(cart.Id)
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].Id == id){
          console.log("HOORY");
          cart.splice(i, 1);
          setLocalStorage("so-cart", cart);
          console.log(i);
          i--;
        }
      }
      location.reload();
  });
});
