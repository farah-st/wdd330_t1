import { getData } from "./productData.mjs"
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    // creates a template to join into HTML document
    return `<li class="product-card">
                <a href="../product_pages/index.html?product=${product.Id}">
                    <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}">
                    <h3 class="card__brand">${product.Brand.Name}</h3>
                    <h2 class="card__name">${product.Name}</h2>
                    ${discountTemplate(product)}
                </a>
            </li>`
}

function calculateDiscount(maxValue,minValue){
    let discount = (maxValue - minValue) / maxValue * 100;
    return discount.toFixed();
}

function discountTemplate(product){
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        return `<p class="product-card__without-discount-price">$${product.SuggestedRetailPrice}</p>
                <p class="product-card__price">$${product.FinalPrice}
                <span class="product-discount">${calculateDiscount(product.SuggestedRetailPrice,product.FinalPrice)}% OFF</span>
                </p>`
    } else {
        return `<p class="product-card__price">$${product.FinalPrice}</p></a>`;
    }
    
}

export default async function productList(selector, category){
// Creates li elements with productCardTemplate as template

    // get the element we will insert the list into from the selector
     const element = document.querySelector(selector);

    // get the list of products 
    const products = await getData(category);

    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, products);
    document.querySelector(".title").innerHTML = category;
   return products; 
    
}

// Function to sort products
function sortProducts(products) {
  let sortBy = document.getElementById("sort").value;

  // Sort the products array based on the selected sorting option
  if (sortBy === "name") {
    products.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (sortBy === "price") {
    products.sort(function(a, b) {
      return a.price - b.price;
    });
  }
  displayProducts();
}

// Function to display products
function displayProducts() {
  let renderProduct = document.querySelector(".product-list");
  renderProduct.innerHTML = "";
}
