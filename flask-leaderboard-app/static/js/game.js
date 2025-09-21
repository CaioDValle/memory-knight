const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player')

const timer = document.querySelector('.timer')

const characters = [
    'grimm',
    'hornet',
    'knight',
    'quirrel',
    'reipal',
    'radiance',
    'hk',
    'elderbug',
    'sly',
    'cornifer',
];

const createElement = (tag,  className) => {
    const element = document.createElement (tag);
    element.className = className;
    return element;
}

let firstCard = '';

let secondCard= '';

let timerStarted = false; // controle para evitar múltiplos timers

const checkEndgame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 20) {
        clearInterval(loop);
        const player = localStorage.getItem('player');
        const time = parseInt(timer.innerHTML, 10);
        // Envia os dados para o backend Flask
         fetch('/submit_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(player)}&game_time=${encodeURIComponent(time)}`
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/leaderboard";
            } else {
                alert('Erro ao salvar seu recorde!');
            }
        })
        .catch(() => {
            alert('Erro de conexão com o servidor!');
        });
    }
}
       
       
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        
       firstCard.firstChild.classList.add('disabled-card');
       secondCard.firstChild.classList.add('disabled-card');

       
        firstCard = '';
        secondCard = '';
    
        checkEndgame();

    } else {
        setTimeout (() => {
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = '';
        secondCard = '';
    }, 500);
}

}

const revealCard = ({target}) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard= target.parentNode;    

}   else if (secondCard === ''){
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

    }
}
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

front.style.backgroundImage = `url('/static/Images/${character}.png')`;

card.appendChild (front);
card.appendChild (back);

card.addEventListener('click', revealCard)
card.setAttribute('data-character', character)

return card;
}
const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters]; 
    
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    
    shuffledArray.forEach((character) => {
        
        const card = createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () => {
    // Garante que só existe um timer rodando
    if (window.loop) clearInterval(window.loop);
    timer.innerHTML = "0";
    window.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    spanPlayer.innerHTML = "";
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) bgMusic.volume = 0.5;

    // Conecta o socket no endereço atual (importante para mobile)
    const socket = io(window.location.origin);

    // Aguarda o evento do computador
    socket.on('start_game', function(data) {
        console.log('Recebido start_game:', data); // debug
        localStorage.setItem('player', data.player);
        spanPlayer.innerText = data.player ? data.player : "Jogador";
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.style.display = 'none';
        grid.innerHTML = ""; // limpa grid antes de iniciar nova partida
        loadGame();
        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
    });

    // Para depuração: log quando conectar
    socket.on('connect', function() {
        console.log('Socket conectado no mobile!');
    });
});



