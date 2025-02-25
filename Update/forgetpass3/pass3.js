// document.addEventListener("DOMContentLoaded", function () {
//     // Function to handle form submission
//     function handleSubmit(event) {
//       event.preventDefault();
//       const passwordInput = document.querySelector("input[name='password']").value;
//       const confirmPasswordInput = document.querySelector("input[name='password1']").value;
//       if (passwordInput && confirmPasswordInput) {
//         if (passwordInput === confirmPasswordInput) {
//           alert("Password successfully set.");
//           // Redirect to the next page (replace the URL with your target page)
//           window.location.href = "../login/login.html";
//         } else {
//           alert("Passwords do not match. Please try again.");
//         }
//       } else {
//         alert("Please fill in both fields.");
//       }
//     }
  
//     // Add event listener for form submission
//     const form = document.querySelector("form");
//     if (form) {
//       form.addEventListener("submit", handleSubmit);
//     }
  
//     // Function to handle menu toggle
//     function toggleMenu() {
//       const menu = document.getElementById("menu");
//       menu.classList.toggle("hidden");
//     }
//     const menuButton = document.querySelector(".md:hidden button");

//     if (menuButton) {
//       menuButton.addEventListener("click", toggleMenu);
//     }
//     menuButton.addEventListener("click", toggleMenu);
//   });
  

document.addEventListener("DOMContentLoaded", function () {
  async function validateCodeWithBackend(code) {
    try {
        const response = await fetch('/validate-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        });
        const data = await response.json();
        return  data.isCodeValid;
    } catch (error) {
        console.error('Error validating email with backend:', error);
        return false;
    }
}
    // Function to handle form submission
    async function handleSubmit(event) {
      event.preventDefault();
      const password = document.getElementById("password").value;
      const password1 = document.getElementById("password1").value;
      if (password && password1) {
        
        if (password === password1) {
          // alert("Password successfully set.");
          // Redirect to the next page (replace the URL with your target page)
          window.location.href = "../login/login.html";
        } else {
          alert("Passwords do not match. Please try again.");
          
        }
      }
      
  }

    // Function to handle resending the code
    function handleResend(event) {
      event.preventDefault();
      alert("Verification code resent to your email.");
      // Implement the actual resend code functionality here
    }
  
    // Add event listener for form submission
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
  
    // Add event listener for resending the code
    const resendLink = document.querySelector(".resend1");
    resendLink.addEventListener("click", handleResend);
  });
  