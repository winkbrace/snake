const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const directions = {right: 0, down: 1, left: 2, up: 3};
const gameOverImage = new Image();
gameOverImage.onload = function() {
    const x = canvas.width / 2 - gameOverImage.width / 2;
    const y = canvas.height / 2 - gameOverImage.height / 2;
    ctx.drawImage(gameOverImage, x, y, gameOverImage.width, gameOverImage.height);
}
const newGameButton = document.getElementById('newGameButton');
newGameButton.addEventListener('click', () => newGame());

let speed, direction, snake, food, gameLoop, gameIsRunning;

// Listen to direction changes
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && snake.direction !== directions.down) {
        direction = directions.up;
    } else if (event.key === 'ArrowDown' && snake.direction !== directions.up) {
        direction = directions.down;
    } else if (event.key === 'ArrowLeft' && snake.direction !== directions.right) {
        direction = directions.left;
    } else if (event.key === 'ArrowRight' && snake.direction !== directions.left) {
        direction = directions.right;
    } else if (event.key === 'Enter' && ! gameIsRunning) {
        newGame();
    }
});

newGame();

function newGame() {
    newGameButton.style.display = 'none';
    gameIsRunning = true;

    speed = 12;
    direction = directions.right;
    snake = {
        head: {row:0, col:2},
        direction: direction, // track snake direction to prevent quick key presses will reverse the snake.
        size: 3,
        cells: [
            {row:0, col:2},
            {row:0, col:1},
            {row:0, col:0},
        ]
    };
    spawnFood();
    setGameLoop();
}

function setGameLoop() {
    clearInterval(gameLoop);
    gameLoop = setInterval(() => {
        next();
        draw();
        validate();
    }, 1000 / speed);
}

function validate() {
    if (snake.head.col >= cols
        || snake.head.row >= rows
        || snake.head.col < 0
        || snake.head.row < 0
        || collidesWithSnakeBody(snake.head)
    ) {
        gameOver();
    }
}

function collidesWithSnakeBody(cell) {
    // skip head cell
    for (let i = 1; i < snake.size; i++) {
        const c = snake.cells[i];
        if (c.row === cell.row && c.col === cell.col) {
            return true;
        }
    }
    return false;
}

function next() {
    snake.direction = direction;

    if (direction === directions.right) {
        snake.head.col++;
    } else if (direction === directions.down) {
        snake.head.row++;
    } else if (direction === directions.left) {
        snake.head.col--;
    } else if (direction === directions.up) {
        snake.head.row--;
    }

    if (food.row === snake.head.row && food.col === snake.head.col) {
        snake.size++;
        if (snake.size % 2 === 0) speed++;
        spawnFood();
        setGameLoop();
    }

    snake.cells.unshift({row: snake.head.row, col: snake.head.col});
    if (snake.cells.length > snake.size) {
        snake.cells.pop();
    }
}

function spawnFood() {
    // do { // commented because this causes a gap in the snake body
        food = {
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols),
        }
    // } while (collidesWithSnakeBody(food))
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // stats
    ctx.font = "20px Fascinate";
    ctx.fillStyle = "yellow";
    ctx.fillText(`SIZE: ${snake.size}`, 10, 20);
    ctx.fillText(`SPEED: ${speed}`, 10, 44);
    // snake
    ctx.fillStyle = "cyan";
    for (let cell of snake.cells) {
        ctx.fillRect(
            cell.col * gridSize + 1,
            cell.row * gridSize + 1,
            gridSize - 2,
            gridSize - 2,
        );
    }
    // food
    ctx.fillStyle = "yellow";
    ctx.fillRect(
        food.col * gridSize + 1,
        food.row * gridSize + 1,
        gridSize - 2,
        gridSize - 2,
    );
}

function gameOver() {
    gameIsRunning = false;
    gameOverImage.src = 'game-over.png';
    newGameButton.style.display = 'block';
    clearInterval(gameLoop);
}
