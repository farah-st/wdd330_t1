import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
  const form = new FormData(formElement),
    convertedJSON = {};

  form.forEach(function(value, key) {
    convertedJSON[key] = value;
  }); 
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity
    }
  });
  return simplifiedItems;
}

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

    const itemSubtotal = document.querySelector("#itemTotal");
    const itemQuantity = document.querySelector("#itemQuantity");

    //let grandTotal = 0;
    //let this.quantityTotal = 0;
    for(let t = 0; t < this.list.length; t++){
      this.itemTotal += (this.list[t].FinalPrice * this.list[t].quantity);
      this.quantityTotal += parseFloat(this.list[t].quantity);
    }
    itemSubtotal.innerHTML = this.itemTotal;
    itemQuantity.innerHTML = this.quantityTotal;
    
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    //let shipping = 0;
    
    if (this.quantityTotal > 1) {
     this.shipping = (this.quantityTotal - 1) * 2 + 10;
    }
    else {
      this.shipping = 10;
    }

    //this.tax = tax;
    //this.shipping = shipping;
    this.orderTotal = (parseFloat(this.tax) + parseFloat(this.shipping) + parseFloat(this.itemTotal)).toFixed(2);
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    let itemTotal = document.getElementById("itemTotal");
    let shipping = document.getElementById("shipping");
    let tax = document.getElementById("tax");
    let orderTotal = document.getElementById("orderTotal");
    
    itemTotal.innerHTML = this.itemTotal;
    shipping.innerHTML = this.shipping;
    tax.innerHTML = this.tax;
    orderTotal.innerHTML = this.orderTotal;

    // itemTotal = this.itemTotal;
    // shipping = this.shipping;
    // tax = this.tax;
    // orderTotal = this.orderTotal;

  },

  checkout: async function(form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json)
    try {
      const res = await checkout(json);
      console.log(res);
      window.open("./success.html", "_blank").focus();
    } catch (err) {
      console.log(err);
    }
  }

}

export default checkoutProcess;


