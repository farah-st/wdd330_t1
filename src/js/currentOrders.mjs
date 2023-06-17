import { makeOrder } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export async function displayOrder(token,table){
    const list = await makeOrder(token);
    // console.log(list)
    // renderListWithTemplate(orderTemplate,selector,list);
    list.map((item)=>{
      renderOrder(table,item)
    })
    
}

// function orderTemplate(item){

//     return `<li class="cart-card divider">
//       <span>${item.id}</span>
//       <span>${parseFloat(item.orderTotal).toFixed(2)}</span>
//       <span>${item.items.length}</span>
//       <span>${formatDate(item.orderDate)}</span>
//     </li>`;
// }

function formatDate(dateString){
const date = new Date(dateString);

let month = date.getUTCMonth() + 1;
let day = date.getUTCDate();
let year = date.getUTCFullYear();

let formatDate = (month < 10 ? "0" : "") + month + "/" + (day < 10 ? "0" : "") + day + "/" + year;

return formatDate;
}

function renderOrder(table,item) {
  
  let tbody = table.getElementsByTagName("tbody")[0];

  // Crea una nueva fila
  let row = tbody.insertRow();

  // Agrega celdas a la fila
  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();

  // Agrega valores a las celdas
  cell1.innerHTML = item.id;
  cell2.innerHTML = parseFloat(item.orderTotal).toFixed(2);
  cell3.innerHTML = item.items.length;
  cell4.innerHTML = formatDate(item.orderDate);
}
