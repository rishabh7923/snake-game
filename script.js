const board = document.getElementById("game-board");
const startScreen = document.getElementById("startscreen");
const highScoreP = document.getElementById("highScore");
const scoreP = document.getElementById("score");

let gameStarted = false;
let snake = [{ x: 10, y: 10 }];
let direction = 'right';

let maxScore = 0;

let gameInterval;
let food;

function generateFood() {
    const x = Math.floor(Math.random() * 20) + 1;
    const y = Math.floor(Math.random() * 20) + 1;

    return { x, y };
}

function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    drawScore();
}

function drawScore() {
    scoreP.innerText = (snake.length - 1).toString().padStart(3, '0');
}

function drawSnake() {
    snake.forEach(({ x, y }) => {
        const block = document.createElement("div");
        block.classList.add("snake");

        block.style.gridColumn = x;
        block.style.gridRow = y;

        board.appendChild(block);
    })
}

function drawFood() {
    const block = document.createElement("div");
    block.classList.add("food");

    block.style.gridColumn = food.x;
    block.style.gridRow = food.y;

    board.appendChild(block);
}

function move() {
    const head = { ...snake[0] };
    console.log(direction)

    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head);

    if (food.x == head.x && food.y == head.y) {
        food = generateFood();

        score++;
    } else {
        snake.pop();
    }
}


function checkCollision() {
    //check if head goes out of boundary
    const head = snake[0];
    if (head.x > 20 || head.y > 20 || head.x < 1 || head.y < 1) endGame();
    if (snake.slice(1).some(({x, y}) => head.x == x && head.y == y)) endGame();
}

function startGame() {
    gameStarted = true;
    food = generateFood();

    draw();

    gameInterval = setInterval(() => {
        move();
        draw();
        checkCollision();
    }, 200);
}

function endGame() {
    gameStarted = false;
    clearInterval(gameInterval);

    board.innerHTML = '';
    board.appendChild(startScreen);

    maxScore = Math.max(maxScore, snake.length - 1)
    highScoreP.innerText = maxScore.toString().padStart(3, '0');

    snake = [{x: 10, y: 10}];
    score = 0;
}


document.addEventListener('keydown', (event) => {
    console.log(event.key)
    if (event.key == ' ' && !gameStarted) return startGame();

    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
    }
})