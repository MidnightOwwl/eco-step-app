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
        authorizeUser(loginForm);
    }

    if (registrationForm) {
        authorizeUser(registrationForm);
    }
    
    // Выход из системы
    const logoutLink = document.getElementById('logout-button');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('username');
            window.location.href = 'main.html';
        });
    }
});

function authorizeUser(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        
        // TODO: Подключить бэк
        if (username && password) {
            sessionStorage.setItem('username', username);
            window.location.href = 'profile.html';
        } else {
            alert('Введите логин и пароль');
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