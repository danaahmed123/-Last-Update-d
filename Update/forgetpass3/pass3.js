document.addEventListener("DOMContentLoaded", function () {
    // Function to handle form submission
    function handleSubmit(event) {
      event.preventDefault();
      const passwordInput = document.querySelector("input[name='password']").value;
      const confirmPasswordInput = document.querySelector("input[name='password1']").value;
      if (passwordInput && confirmPasswordInput) {
        if (passwordInput === confirmPasswordInput) {
          alert("Password successfully set.");
          // Redirect to the next page (replace the URL with your target page)
          window.location.href = "../login/login.html";
        } else {
          alert("Passwords do not match. Please try again.");
        }
      } else {
        alert("Please fill in both fields.");
      }
    }
  
    // Add event listener for form submission
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
  
    // Function to handle menu toggle
    function toggleMenu() {
      const menu = document.getElementById("menu");
      menu.classList.toggle("hidden");
    }
  
    // Add event listener for menu toggle button
    const menuButton = document.querySelector(".md:hidden button");
    menuButton.addEventListener("click", toggleMenu);
  });
  