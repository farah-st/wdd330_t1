// function createAlerts(alertData) {
//     const alertContainer = document.getElementById("alert-list");
  
//     alertData.forEach(alert => {
//       const { message, background } = alert;
  
//       const alertElement = document.createElement("div");
//       alertElement.className = "alert";
//       alertElement.textContent = message;
//       alertElement.style.backgroundColor = background;
  
//       alertContainer.appendChild(alertElement);
//     });
//   }

// fetch("alert.json")
//   .then(response => response.json())
//   .then(data => {
//     // Process the alert data
//     createAlerts(data);
//   })
//   .catch(error => {
//     console.error("Error fetching alerts:", error);
//   });


