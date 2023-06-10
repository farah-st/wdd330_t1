import { findProductById, getProductsByCategory } from "./externalServices.mjs"
import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";
import { productDetailsTemplate } from "./productDetails.mjs";

function productCardTemplate(product) {
    // creates a template to join into HTML document
    return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            ${discountTemplate(product)}
        </a>
        <button data-id=${product.Id}>View</button>
    </li>`;
}

function quickViewTemplate(product){
  return `<div class="quick-view">
              
                  
              <img src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}">
              <h2 class="card__name">${product.Name}</h2>
              <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
              ${discountTemplate(product)}
              <button>X</button>    
                  
              
          </div>`
}

function calculateDiscount(maxValue, minValue) {
    let discount = ((maxValue - minValue) / maxValue) * 100;
    return discount.toFixed();
}

function discountTemplate(product) {
    if (product.FinalPrice < product.SuggestedRetailPrice) {
      return `<p class="product-card__without-discount-price">$${product.SuggestedRetailPrice}</p>
              <p class="product-card__price">$${product.FinalPrice}
              <span class="product-discount">${calculateDiscount(
                product.SuggestedRetailPrice,
                product.FinalPrice
              )}% OFF</span>
              </p>`;
    } else {
      return `<p class="product-card__price">$${product.FinalPrice}</p>`;
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

  function filterByNameProducts(productList, textFilter){
    if (!textFilter==""){
        return productList.filter((item) => 
        item.Name.toLowerCase().includes(textFilter.toLowerCase()));
    }
    return productList;
}



export default async function productList(selector, category, orderBy = "name", textFilter=""){
// Creates li elements with productCardTemplate as template

    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);
  
    // get the list of products
    let products = await getProductsByCategory(category);
  
    products = sortProducts(products, orderBy);

    products = filterByNameProducts(products,textFilter);

    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, products);
    document.querySelector(".title").innerHTML = category;
        //return products;
        document.querySelectorAll("button")
        .forEach((item) => {
            item.addEventListener("click", async function (e) {
                let product = await findProductById(e.target.dataset.id);

                let quickView = document.querySelector(".quick-view");
                if (quickView == null) {
                  await renderWithTemplate(quickViewTemplate,element,product,undefined,undefined,false);
                } else {
                  quickView.remove()
                  await renderWithTemplate(quickViewTemplate,element,product,undefined,undefined,false);
                }


                document.querySelector(".quick-view button")
                  .addEventListener("click",(e) => {

                    e.target.parentNode.remove();
                  })
            })
    })
  }

