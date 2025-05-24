// login.js
// Form toggle functionality
function login() {
    const btn = document.getElementById("btn");
    const loginForm = document.getElementById("login");
    const signupForm = document.getElementById("signup");
    
    if (btn && loginForm && signupForm) {
        btn.style.left = "0";
        loginForm.style.left = "50px";
        signupForm.style.left = "450px";
    }
}

function signup() {
    const btn = document.getElementById("btn");
    const loginForm = document.getElementById("login");
    const signupForm = document.getElementById("signup");
    
    if (btn && loginForm && signupForm) {
        btn.style.left = "110px";
        loginForm.style.left = "-400px";
        signupForm.style.left = "50px";
    }
}

// Initialize form position on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const form = urlParams.get('form');
    
    if (form === 'signup') {
        signup();
    } else {
        login();
    }

    const loginForm = document.getElementById("login");
    const rememberCheckbox = document.getElementById("remember");

    // Check if there are saved credentials
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    
    if (savedUsername && savedPassword) {
        document.querySelector("#login input[placeholder='Username']").value = savedUsername;
        document.querySelector("#login input[placeholder='Enter Password']").value = savedPassword;
        rememberCheckbox.checked = true;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
        
            const username = document.querySelector("#login input[placeholder='Username']").value;
            const password = document.querySelector("#login input[placeholder='Enter Password']").value;
        
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Find user with matching credentials
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Save credentials if remember me is checked
                if (rememberCheckbox.checked) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                } else {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                }

                // Store current user info
                localStorage.setItem('currentUser', JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email
                }));

                alert("Login successful!");
                window.location.href = "/index.html";
            } else {
                alert("Invalid username or password!");
            }
        });
    }

    // Signup form submission
    const signupForm = document.getElementById("signup");
    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault();
        
            const username = document.querySelector("#signup input[placeholder='Username']").value;
            const email = document.querySelector("#signup input[placeholder='Email']").value;
            const password = document.querySelector("#signup input[placeholder='Enter Password']").value;
            const confirmPassword = document.querySelector("#signup input[placeholder='Confirm Password']").value;
            const terms = document.getElementById('terms').checked;
        
            if (!terms) {
                alert("Please agree to the terms and conditions!");
                return;
            }
        
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
        
            // Get existing users or initialize empty array
            const users = JSON.parse(localStorage.getItem('users') || '[]');
        
            // Check if username already exists
            if (users.some(user => user.username === username)) {
                alert("Username already exists!");
                return;
            }
        
            // Add new user
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
        
            alert("Signup successful! Please login.");
            login(); // Switch to login form
        });
    }
});

<a href="javascript:void(0)" id="goToLogin" style="cursor: pointer; color: blue; text-decoration: underline;">Already have an account? Login here.</a>
