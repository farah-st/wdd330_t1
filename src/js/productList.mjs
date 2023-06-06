import { getProductsByCategory } from "./externalServices.mjs"
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

function sortProducts(productsArray, orderBy) {
    return productsArray.sort((a, b) => {
      if (orderBy === "name") {
        if (a.Name < b.Name) return -1;
        if (a.Name > b.Name) return 1;
      } else if (orderBy === "FinalPrice") {
        return a.FinalPrice - b.FinalPrice;
      }
      return 0;
    });
  }

export default async function productList(selector, category, orderBy = "name"){
// Creates li elements with productCardTemplate as template

    // get the element we will insert the list into from the selector
     const element = document.querySelector(selector);

    // get the list of products 
    const products = await getProductsByCategory(category);


    const newProduct = sortProducts(products, orderBy)
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, newProduct);
    document.querySelector(".title").innerHTML = category;
    return products;
}

