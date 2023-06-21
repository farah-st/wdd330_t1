document.getElementById("newsletterForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the email input value
    const email = document.getElementById("emailInput").value;

    // Perform any additional validation here

    // Send the email to the server using AJAX or fetch API
    // Replace 'subscribe.php' with the appropriate endpoint
    fetch("subscribe.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    })
    .then(function(response) {
      // Handle the server response here
      if (response.ok) {
        alert("Please try again. Newsletter subscription failed.");
      } else {
        alert("You have successfully signed up for the newsletter!");
      }
    })
    .catch(function(error) {
      // Handle any errors that occurred during the request or response
      console.error("An error occurred:", error);
    });
  });