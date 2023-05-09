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
  const newItem = `<li class="cart-card divider" data-id="${index}>
  <a href="#" class="cart-card__image">
  <span class="kill-product" >X ${index}</span>
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




const killButtons = document.querySelectorAll('.kill-product');
  //  const dataId = document.querySelectorAll("[data-id]");
  //   dataId.forEach(id => console.log(id));

// Agregar un "event listener" para cada elemento
killButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Obtener el elemento padre del botón actual y eliminarlo
    const cart = getLocalStorage('so-cart');
    const parentElement = this.parentElement; 
    
    parentElement.remove();
  });
});
















// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item, index) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//   <span class="cart_remove">X ${index}</span>
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

//  renderCartContents();


// // // // remove product to cart
// // function removeProductFromCart(item) {

// //   const cart = getLocalStorage("so-cart");
// //   const htmlItems = cart.map((item) => cartItemTemplate(item));
// //   var dataId = htmlItems[0];
// //   dataId = document.getElementById("#data-id") ;
// //   console.log(dataId)
  

// //   cart.splice(index, 1);

// //   setLocalStorage("so-cart", cart);

// //   renderCartContents();
// // }


// // // add listener to remove from Cart button
// // document
// //   .querySelector("cart_remove")
// //   .addEventListener("click", removeProductFromCart);


//   const killButtons = document.querySelectorAll('.cart-remove');

// // Agregar un "event listener" para cada elemento
// killButtons.forEach(button => {
//   button.addEventListener('click', function() {
//     // Obtener el elemento padre del botón actual y eliminarlo
//     const parentElement = this.parentElement;
//     parentElement.remove();
//   });
// });