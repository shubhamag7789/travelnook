// signup.js
// Signup form submission
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById("signup");

    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault();
        
            // Get form values
            const firstName = document.querySelector("input[placeholder='First Name']").value;
            const lastName = document.querySelector("input[placeholder='Last Name']").value;
            const username = document.querySelector("input[placeholder='Username']").value;
            const email = document.querySelector("input[placeholder='Email Address']").value;
            const phone = document.querySelector("input[placeholder='Phone Number']").value;
            const password = document.querySelector("input[placeholder='Create Password']").value;
            const confirmPassword = document.querySelector("input[placeholder='Confirm Password']").value;
            const terms = document.getElementById('terms').checked;

            // Validate passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Validate terms
            if (!terms) {
                alert("Please agree to the Terms & Conditions");
                return;
            }

            try {
                // Get existing users or initialize empty array
                const users = JSON.parse(localStorage.getItem('users') || '[]');

                // Check if username already exists
                if (users.some(user => user.username === username)) {
                    alert("Username already exists!");
                    return;
                }

                // Check if email already exists
                if (users.some(user => user.email === email)) {
                    alert("Email already registered!");
                    return;
                }

                // Create new user object
                const newUser = {
                    firstName,
                    lastName,
                    username,
                    email,
                    phone,
                    password
                };

                // Add to users array
                users.push(newUser);

                // Save to localStorage
                localStorage.setItem('users', JSON.stringify(users));

                // Show success message
                alert("Signup successful! Please login.");
                
                // Redirect to login page
                window.location.href = "login.html";
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred during signup");
            }
        });
    }
});
<a href="javascript:void(0)" id="goToLogin" style="cursor: pointer; color: blue; text-decoration: underline;">Already have an account? Login here.</a>
  