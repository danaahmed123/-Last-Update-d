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
      const codeInput = document.getElementById("number").value;
      if (codeInput && await validateCodeWithBackend(codeInput)) {
        alert("Verification code submitted: " + codeInput);
        // Redirect to the next page (replace the URL with your target page)
        window.location.href = "../forgetpass3/forgetpass3.html";
      } else if ( ! await validateCodeWithBackend(codeInput)) {
        alert("Please enter the correct verification code from your mail.");
      }else {
        alert("Please enter valid code.");
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
  