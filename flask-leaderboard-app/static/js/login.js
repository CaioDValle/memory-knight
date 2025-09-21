const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

input.addEventListener('input', function() {
    button.disabled = input.value.length < 3;
});

// Limpa nome salvo ao abrir a tela de login
document.addEventListener('DOMContentLoaded', function() {
    localStorage.removeItem('player');
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    localStorage.setItem('player', input.value);
    // Apenas envia o nome via POST e redireciona
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `player=${encodeURIComponent(input.value)}`
    }).then(() => {
    });
});

// Remova todo o uso do socket neste arquivo