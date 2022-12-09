// GAME CONFIG
const BLOCK_SIZE = 40;
const BLOCK_NUM = 20;
const FPS = 5;

// Variables
const FRAME_TIME = 1000 / FPS;
const body = document.querySelector('body');
let canvas;
let timer = 0;
// let engine = new Engine();
let apple = new Apple(BLOCK_SIZE);
let snake = new Snake(BLOCK_SIZE);

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
    if (snake.possitionX < 0 || snake.possitionX > BLOCK_NUM - 1) lose();
    if (snake.possitionY < 0 || snake.possitionY > BLOCK_NUM - 1) lose();

    if (snake.possitionX === apple.possitionX & snake.possitionY === apple.possitionY) {
        const appleDiv = document.querySelector('.apple');
        if (appleDiv) appleDiv.remove();

        snake.grow();
        if (snake.body.length == BLOCK_NUM * BLOCK_NUM) win();

        apple.spawn(canvas, randomCoords(snake.body), snake.body.length);
    }

    snake.body.forEach((part, index) => {
        if (index > 1)
            if (snake.possitionX === part[0] && snake.possitionY === part[1])
                lose();
    });
}

function randomCoords(snakeArr) {
    let overlap = false;
    const coords = [getRandomInt(0, BLOCK_NUM), getRandomInt(0, BLOCK_NUM)];
    snakeArr.forEach(part => {
        if (coords[0] === part[0] && coords[1] === part[1])
            overlap = true;
    });
    if (overlap) return randomCoords(snakeArr);
    return coords;
}

function win() {
    console.log('YOU WIN');
    snake.kill();
}

function lose() {
    console.log('YOU LOSE');
    snake.kill();
    location.reload();
}

function update() {
    const time = Date.now();
    if (timer < time) {
        timer = time + FRAME_TIME;
        snake.move();
        snake.draw(canvas);
        collision();
    }
    window.requestAnimationFrame(update);
}

function main() {
    drawCanvas();
    apple.spawn(canvas, randomCoords(snake.body), snake.body.length);
    update();
}
main();

window.addEventListener('keyup', (e) => processInput(e));

// helpers

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
