document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle the menu
    function toggleMenu() {
      const menu = document.getElementById("menu");
      menu.classList.toggle("hidden");
    }
  
    // Add event listener to the menu button
    const menuButton = document.querySelector("button[onclick='toggleMenu()']");
    if (menuButton) {
      menuButton.addEventListener("click", toggleMenu);
    }
  });
  