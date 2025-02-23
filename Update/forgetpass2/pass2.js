document.addEventListener("DOMContentLoaded", function () {
    // Function to handle form submission
    function handleSubmit(event) {
      event.preventDefault();
      const codeInput = document.getElementById("number").value;
      if (codeInput) {
        alert("Verification code submitted: " + codeInput);
        // Redirect to the next page (replace the URL with your target page)
        window.location.href = "../forgetpass3/forgetpass3.html";
      } else {
        alert("Please enter the verification code.");
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
  