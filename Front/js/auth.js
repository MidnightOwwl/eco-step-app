import { EcoStepApi } from "./api.js";

const api = new EcoStepApi();

document.addEventListener('DOMContentLoaded', function() {
    const username = sessionStorage.getItem('username');
    
    if (window.location.pathname.includes('profile.html') && username) {
        document.getElementById('user-login').textContent = username;
    }
    
    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');
    if (loginForm) {
        loginUser(loginForm);
    }

    if (registrationForm) {
        registerUser(registrationForm);
    }
    
    const logoutLink = document.getElementById('logout-button');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('username');
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('userId');
            window.location.href = 'main.html';
        });
    }
});

function registerUser(form) {
    form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('login').value.trim();
            const password = document.getElementById('password').value;
            try {
                if (username && password) {
                    await api.register(username, password);
                    sessionStorage.setItem('username', username);
                    console.log('Registration successful');
                    await api.login(username, password);
                    console.log('Login successful');
                    window.location.href = 'main.html';
                } else {
                    alert('Please enter your login and password');
                }
            } catch (error) {
                console.log(error);
            }
            
    });
}

function loginUser(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('login').value.trim();
        const password = document.getElementById('password').value;
        
        try {
            if (username && password) {
                await api.login(username, password);
                sessionStorage.setItem('username', username);
                console.log('Login successful');
                window.location.href = 'main.html';
            } else {
                alert('Please enter your login and password');
            }
        } catch (error) {
            console.log(error);
        }
    });
}