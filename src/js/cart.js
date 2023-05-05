import {findProductById, getData} from "./productData.mjs";
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
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
 <span id="cart_remove" data-id="${item.Id}" >X ${item.Id}</span>
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


// // remove product to cart
function removeProductFromCart(item) {

  const cart = getLocalStorage("so-cart");

  cart.splice(1, 1);

  setLocalStorage("so-cart", cart);

  renderCartContents();
}


// add listener to remove from Cart button
document
  .getElementById("cart_remove")
  .addEventListener("click", removeProductFromCart);