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
    <p class="cart-card__quantity">qty: <input type="number" id="quantityNum" name="quantityNum" value="1" data-id="${item.Id}" data-number="></p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
};

const Quantity = document.getElementById("quantityNum");




function quantityInCart(e) {
    const {id} = e.target.dataset;
    const {number} = e.target.dataset;
    let x = document.getElementById("quantityNum").value;
     const valueNum = document.getElementsByName("quantityNum").value; 
     console.log(id, x)
}

document.addEventListener("input", quantityInCart);

// const Quantity = document.querySelectorAll(".quantityNum");

// //remove Item from cart
//   Quantity.forEach(Number => {
//     Number.addEventListener('input', function(el) {
//            const {id} = el.target.dataset
//     //  const finalPrice = document.querySelector({FinalPrice});
//      console.log(id)
//     });
//   });


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
    let GrandTotal = 0;
         for(let t = 0; t < cart.length; t++){
       GrandTotal += cart[t].FinalPrice;
     }
         // const cartTotal = document.getElementById("cart-total");
         // cartTotal.innerHTML = GrandTotal;
         renderCartTotal(GrandTotal);
   return GrandTotal;
    } catch (error) {
      console.log(error);
    }
    
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