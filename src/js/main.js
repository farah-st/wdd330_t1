import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();


function hasSeen() {
    return localStorage.getItem("bannerSeen") === "true";
  }
  
  // Set a flag indicating the visitor has seen the banner/modal
  function bannerSeen() {
    localStorage.setItem("bannerSeen", "true");
  }
  
  // Show the banner/modal
  function showBanner() {
    var modal = document.querySelector(".modal");
    modal.style.display = "block";
  }
  
  // Close the banner/modal
  function closeBanner() {
    var modal = document.querySelector(".modal");
    modal.style.display = "none";
  }
  
  // Event listener for the close button
  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    closeBanner();
  });
  
  // Event listener for the register button
  document.getElementById("register-btn").addEventListener("click", function() {
    // Add your registration logic here
    alert("Thank you for registering! Here is the code to get 10% OFF: GX123SD");
    closeBanner();
  });
  
  // Check if the visitor has already seen the banner/modal
  if (!hasSeen()) {
    showBanner();
    bannerSeen();
  }