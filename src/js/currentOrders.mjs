import { makeOrder } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export async function displayOrder(token,selector){
    const list = await makeOrder(token);
    console.log(list)
    renderListWithTemplate(orderTemplate,selector,list);
}

function orderTemplate(item){

    return `<li class="cart-card divider">
    <span>${item.id}</span>
    <span>${item.orderTotal}</span>
    <span>${item.shipping}</span>
    <span>${item.state}</span>
  </li>`;
    

}