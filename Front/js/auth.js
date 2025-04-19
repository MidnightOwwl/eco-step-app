// Проверяем авторизацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const username = sessionStorage.getItem('username');
    updateAuthLinks(username);
    
    if (window.location.pathname.includes('profile.html') && username) {
        document.getElementById('user-login').textContent = username;
    }
    
    // Форма авторизации
    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');
    if (loginForm) {
        loginUser(loginForm);
    }

    if (registrationForm) {
        registerUser(registrationForm);
    }
    
    // Выход из системы
    const logoutLink = document.getElementById('logout-button');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('password');
            window.location.href = 'main.html';
        });
    }
});

function registerUser(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        
        // TODO: Подключить бэк
        if (username && password) {
            localStorage.setItem('username', username);
            sessionStorage.setItem('username', username);
            localStorage.setItem('password', password);
            window.location.href = 'profile.html';
        } else {
            alert('Введите логин и пароль');
        }
    });
}

function loginUser(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        
        // TODO: Подключить бэк
        if (localStorage.getItem('username') == username && localStorage.getItem('password') == password) {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            window.location.href = 'profile.html';
        } else {
            alert('Your login or password is incorrect');
        }
    });
}

// Обновляем ссылки на главной
function updateAuthLinks(username) {
    const links = [
        document.getElementById('profile-link'),
        document.getElementById('home-link'),
        document.getElementById('surveys-link'),
        document.getElementById('data-link')
    ];

    const authLink = document.getElementById('auth-link');
    
    if (authLink) {
        if (username) {
            authLink.style.display = 'none';
            links.forEach(link => {
                if (link) {
                    link.style.display = 'inline';
                }
            });
        } else {
            links.forEach(link => {
                if(link) {
                    link.style.display = 'none';
                }
            });
        }
    }
}