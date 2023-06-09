import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateCartSuperscript } from "./utils.mjs";

export default async function shoppingcart() {
 try {
    const cartItems = getLocalStorage("so-cart");
    if (cartItems.length === 0) {throw Error}
    const htmlItems = document.querySelector(".product-list");
    await renderListWithTemplate(cartItemTemplate,htmlItems,cartItems);
    killProductEvent();
    changeQuantity();

  } catch (error) {
    const emptyCartAlert = cartEmptyTemplate();
    document.querySelector(".products").innerHTML = emptyCartAlert;

  }
}

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
     <span class="kill-product" data-id="${item.Id}">X</span>
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
   <p class="cart-card__quantity"> Quantity:
   <input type="number" class="quantityCart" name="quantityCart" data-id="${item.Id}" data-number="${item.quantity}" value="${item.quantity}"></p>
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
    document.getElementById("cart-total").innerHTML =  `<p id="cart-total">Total: $${GrandTotal}</p>
    <button id="checkout" onclick="window.location.href='../checkout/index.html';">Checkout</button>`;
  }
}

function killProductEvent(){
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
          cart.splice(i, 1);
          setLocalStorage("so-cart", cart);
          i--;
        }
      }
      location.reload();
      shoppingcart();
      getTotal();
    });
  });

  
}

function changeQuantity() {
  const Quantity = document.querySelectorAll(".quantityCart");

      let cart = getLocalStorage("so-cart");
  
  Quantity.forEach(input => {
      input.addEventListener('change', function(element) {
        element.preventDefault();
              const {id} = element.target.dataset;
              const {number} = element.target.dataset;

        for(let i = 0; i < cart.length; i++){
          if (id == cart[i].Id) {

              if (Quantity[i].value > 0) {
                 console.log(id, Quantity[i].value);
                 cart[i].quantity = Quantity[i].value;
              }
              else {
                cart.splice(i, 1);
              }

            setLocalStorage("so-cart", cart);
            shoppingcart();
            updateCartSuperscript();
            getTotal();
          }
        }
      }); 
    });

}


shoppingcart();
getTotal();