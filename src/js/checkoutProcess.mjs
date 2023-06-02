import { getLocalStorage } from "./utils.mjs";


const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    quantityTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    let cart = getLocalStorage("so-cart");
    let GrandTotal = 0;
    let quantityTotal = 0;
    for(let t = 0; t < cart.length; t++){
      GrandTotal += (cart[t].FinalPrice * cart[t].quantity);
      quantityTotal += cart[t].quantity;
    }
    this.itemTotal = GrandTotal;
    this.quantityTotal = quantityTotal;
    
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    let tax = this.itemTotal * 0.06
    let shipping = 0;
    
    if (this.quantityTotal > 1) {
     shipping = (this.shipping - 1) * 2 + 10;
    }
    else {
      shipping = 10;
    }
    this.tax = tax;
    this.shipping = shipping;
    this.orderTotal = tax + shipping + this.itemTotal;
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    this.outputSelector.itemTotal.value = this.itemTotal;
    this.outputSelector.shipping.value = this.shipping;
    this.outputSelector.tax.value = this.tax;
    this.outputSelector.orderTotal.value = this.orderTotal;

  },

  checkout: async function(form) {

  }

}
  function packageItems(items) {
    let cart = getlocalStorage("so-cart");
    return cart;
  }




export default checkoutProcess;


