// GAME CONFIG
const BLOCK_SIZE = 40;
const BLOCK_NUM = 20;
const FPS = 3;

// Variables
const FRAME_TIME = 1000 / FPS;
const body = document.querySelector('body');
let canvas;
let timer = 0;
let snake = new Snake(BLOCK_SIZE);
let apple = new Apple(BLOCK_SIZE, BLOCK_NUM, BLOCK_NUM);

function createCanvas() {
    const div = document.createElement('div');
    div.className = 'canvas';
    div.style.width = `${BLOCK_NUM * BLOCK_SIZE}px`;
    div.style.height = `${BLOCK_NUM * BLOCK_SIZE}px`;
    div.style.backgroundSize = `${BLOCK_SIZE}px ${BLOCK_SIZE}px`;
    return div;
}
function drawCanvas() {
    body.appendChild(createCanvas());
    canvas = document.querySelector('.canvas');
}

function processInput(e) {
    if (e.key === 'R' || e.key === 'r') location.reload();
    else if (e.key === 'ArrowUp' || e.key === 'W' || e.key === 'w') snake.goUp();
    else if (e.key === 'ArrowRight' || e.key === 'D' || e.key === 'd') snake.goRight();
    else if (e.key === 'ArrowDown' || e.key === 'S' || e.key === 's') snake.goDown();
    else if (e.key === 'ArrowLeft' || e.key === 'A' || e.key === 'a') snake.goLeft();
}

function collision() {
    if (snake.possitionX < 0 || snake.possitionX > BLOCK_NUM - 1)
        location.reload();

    if (snake.possitionY < 0 || snake.possitionY > BLOCK_NUM - 1)
        location.reload();

    if (snake.possitionX === apple.possitionX & snake.possitionY === apple.possitionY) {
        snake.growSnake();
        apple.spawnApple(canvas);
    }
}

function update() {
    const time = Date.now();
    if (timer < time) {
        timer = time + FRAME_TIME;
        snake.updateSnake();
        collision();
        snake.drawSnake(canvas);
    }
    window.requestAnimationFrame(update);
}

function main() {
    drawCanvas();
    apple.spawnApple(canvas);
    update();
}
main();

window.addEventListener('keyup', (e) => processInput(e));