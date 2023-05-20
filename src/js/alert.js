//  async function alertMessage(){
//   const response = await fetch("alerts.json");
//   const data = await response.json();
//   console.log(data);
//  }
 
//  alertMessage();


fetch("alerts.json")
  .then(response => response.json())
  .then(data => {
    // Loop through the data to create an alert for each item
    data.forEach(item => {
      // Create a new alert element
      const alert = document.createElement("div");
      alert.classList.add("alert");
      alert.textContent = item.message;
      alert.style.backgroundColor = item.backgroundColor;
      
      // Add the alert to the page
      document.querySelector(".productList").appendChild(alert);
    });
  });

