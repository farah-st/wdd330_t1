import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function hasSeen() {
  return localStorage.getItem("bannerSeen") === "true";
}

function bannerSeen() {
  localStorage.setItem("bannerSeen", "true");
}

function showBanner() {
  var modal = document.querySelector(".modal");
  modal.style.display = "block";
}

function closeBanner() {
  var modal = document.querySelector(".modal");
  modal.style.display = "none";
}

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    closeBanner();
  });

document.getElementById("register-btn").addEventListener("click", function () {
  alert("Thank you for registering! Here is the code to get 10% OFF: GX123SD");
  closeBanner();
});

if (!hasSeen()) {
  showBanner();
  bannerSeen();
}
