import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingcart() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate,htmlItems,cartItems);
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
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

  function getTotal() {

    let cart = getLocalStorage("so-cart");
    let GrandTotal = 0;
         for(let t = 0; t < cart.length; t++){
       GrandTotal += cart[t].FinalPrice;
     }
         // const cartTotal = document.getElementById("cart-total");
         // cartTotal.innerHTML = GrandTotal;
         renderCartTotal(GrandTotal);
   return GrandTotal;
     }
   
   
   function renderCartTotal (GrandTotal) {
     let cart = getLocalStorage("so-cart");
     if (cart.length > 0){
           const cartTotal = document.querySelector("cart-footer hide");
     document.getElementById("cart-total").innerHTML =  `<p id="cart-total">Total: $${GrandTotal}</p>`;
     }
   
    
   }

   shoppingcart();
   getTotal();