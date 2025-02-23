document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle the menu
    function toggleMenu() {
      const menu = document.getElementById("menu");
      menu.classList.toggle("hidden");
      menu.classList.toggle("animate__animated");
      menu.classList.toggle("animate__fadeInDown");
    }
  
    // Add event listener to the menu button
    const menuButton = document.querySelector("button[onclick='toggleMenu()']");
    if (menuButton) {
      menuButton.addEventListener("click", toggleMenu);
    }
  });
  