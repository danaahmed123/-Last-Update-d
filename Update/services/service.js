document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle the menu
       // تحسين القائمة المنسدلة (Hamburger Menu)
       const menuToggle = document.getElementById('menu-toggle');
       const navList = document.querySelector('nav ul');
   
       menuToggle.addEventListener('change', function () {
           if (menuToggle.checked) {
               navList.style.maxHeight = navList.scrollHeight + 'px';
           } else {
               navList.style.maxHeight = '0';
           }
       });
   
  
    // Add event listener to the menu button
  
  });
  