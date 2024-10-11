let sequence = [];
let userSequence = [];
let level = 0;
let colors = ['green', 'red', 'yellow', 'blue'];
let isUserTurn = false;

document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    document.getElementById('message').textContent = "Watch the sequence!";
    nextRound();
}

function nextRound() {
    userSequence = [];
    level++;
    document.getElementById('message').textContent = `Level ${level}`;
    
    const randomColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);
    isUserTurn = false; // Disable user input during sequence display
    playSequence();
}

function playSequence() {
    let delay = 0;
    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashColor(color);
        }, delay);
        delay += 800; // Increase time between flashes for clarity
    });

    setTimeout(() => {
        document.getElementById('message').textContent = "Your turn!";
        isUserTurn = true; // Enable user input after sequence
    }, delay);
}

function flashColor(color) {
    const element = document.getElementById(color);
    element.classList.add('active');
    setTimeout(() => {
        element.classList.remove('active');
    }, 500);
}

// Handle user input
colors.forEach(color => {
    document.getElementById(color).addEventListener('click', (event) => {
        if (!isUserTurn) return; // Ignore clicks if it's not the user's turn
        const clickedColor = event.target.id;
        userSequence.push(clickedColor);
        flashColor(clickedColor);

        if (!checkUserSequence()) {
            document.getElementById('message').textContent = "Game Over!";
            isUserTurn = false; // Disable further input after game over
            return;
        }

        if (userSequence.length === sequence.length) {
            isUserTurn = false; // Disable input while next sequence is shown
            setTimeout(() => {
                nextRound();
            }, 1000);
        }
    });
});

function flashColor(colorId) {
    const colorElement = document.getElementById(colorId);
    colorElement.classList.add('flash');

    // Remove a classe após a animação ter sido concluída
    setTimeout(() => {
        colorElement.classList.remove('flash');
    }, 400); // O mesmo tempo da animação para garantir que ela termine
}

function checkUserSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}