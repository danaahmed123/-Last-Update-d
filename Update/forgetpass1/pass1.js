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

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
        alert("Email is valid. Form submitted.");
        // Add code to handle form submission (e.g., sending the email to the server)
    } else {
        alert("Please enter a valid email address.");
        emailInput.focus();
    }
}

// Adding event listener to the form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
});
