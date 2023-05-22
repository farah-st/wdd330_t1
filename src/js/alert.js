//  async function alertMessage(){
//   const response = await fetch("alerts.json");
//   const data = await response.json();
//   console.log(data);
//  }
 
//  alertMessage();

export default async function displayAlert(){ //*
await fetch("./json/alert.json") //*
  .then(response => response.json())
  .then(data => {
    // Loop through the data to create an alert for each item
    data.forEach(item => {
      // Create a new alert element
      const alert = document.createElement("div");
      alert.classList.add("alert");
      alert.textContent = item.message;
      alert.style.backgroundColor = item.background; //*
      
      // Add the alert to the page
      document.querySelector(".product-list").appendChild(alert); //*
    });
  });

}