// Function to toggle the navigation menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
}

// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to handle form submission with backend email validation
async function validateEmailWithBackend(email) {
    try {
        const response = await fetch('/validate-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        return  data.isEmailValid;
    } catch (error) {
        console.error('Error validating email with backend:', error);
        return false;
    }
}
async function handleSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    
    if (validateEmail(email) && await validateEmailWithBackend(email)) {
        alert("Email is valid. Form submitted.");
        window.location.href = "../forgetpass2/forgetpass2.html";
        // Add code to handle form submission (e.g., sending the email to the server)
    }else if (! validateEmail(email) ){
        alert ("Email is not valid. Please enter a valid email address.");
        emailInput.focus();
    } else if (! await validateEmailWithBackend(email)) {
        alert("Please enter a valid existing address.");
        emailInput.focus();
    }
}

// Adding event listener to the form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
});
