import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingcart() {
  try {
    const cartItems = getLocalStorage("so-cart");
    const htmlItems = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate,htmlItems,cartItems);
  } catch (error) {
    const emptyCartAlert = cartEmptyTemplate();
    document.querySelector(".products").innerHTML = emptyCartAlert;

  } 
}

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${calculateFinalPrice(item)}</p>
  </li>`;
};

function calculateFinalPrice(item){
  let FinalPrice = item.FinalPrice * item.quantity;
  return FinalPrice.toFixed(2);
}

function cartEmptyTemplate() {
  return  `<section class="cart-empty-alert">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <div class="product-detail">
              <a href="/">
                <button>Return to Shop</button>
              </a>
            </div>
          </section>`
};

function getTotal() {
  try {
    let cart = getLocalStorage("so-cart");
    if (cart === null) {return};
    let GrandTotal = 0;
    for(let t = 0; t < cart.length; t++){
      GrandTotal += (cart[t].FinalPrice * cart[t].quantity);
    }
    renderCartTotal(GrandTotal.toFixed(2));
  } catch (error) {
    console.log(error);
  }
  }
  
  
function renderCartTotal (GrandTotal) {
  let cart = getLocalStorage("so-cart");
  if (cart.length > 0){
    document.getElementById("cart-total").innerHTML =  `<p id="cart-total">Total: $${GrandTotal}</p>`;
  }
}

shoppingcart();
getTotal();