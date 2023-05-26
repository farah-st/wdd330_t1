import { getData } from "./productData.mjs"
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    // creates a template to join into HTML document
    const renderProduct = `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`
    return renderProduct;
}


export default async function productList(selector, category){
// Creates li elements with productCardTemplate as template

    // get the element we will insert the list into from the selector
     const element = document.querySelector(selector);

    // get the list of products 
    const products = await getData(category);

    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, products);
}

