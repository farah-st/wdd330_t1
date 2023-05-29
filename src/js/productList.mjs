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

    function renderProductList() {
        const renderList = document.querySelector(".product-list");
        renderList.innerHTML = "";
    
        products.forEach(product => {
          const productElement = document.createElement("div");
          productElement.textContent = `${product.name} - $${product.price.toFixed(2)}`;
          productList.appendChild(productElement);
        });
      }
    
      // Function to sort products by name
      function sortProductsByName() {
        products.sort((a, b) => a.name.localeCompare(b.name));
        renderProductList();
      }
    
      // Function to sort products by price
      function sortProductsByPrice() {
        products.sort((a, b) => a.price - b.price);
        renderProductList();
      }
    
      // Event listeners for sorting buttons
      const sortByNameButton = document.getElementById("sort-by-name");
      sortByNameButton.addEventListener("click", sortProductsByName);
    
      const sortByPriceButton = document.getElementById("sort-by-price");
      sortByPriceButton.addEventListener("click", sortProductsByPrice);
    
      // Initial rendering of product list
    //   renderProductList();

}


  
  