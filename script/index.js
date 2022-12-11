// GAME CONFIG
const BLOCK_SIZE = 40;
const BLOCK_NUM = 20;
const SPEED_BASE = 5;
const SPEED_STEP = 0.02;

// for debug purposes
const BUILD_VERSION = 11;

// Variables
let speed = SPEED_BASE;
let timer = 0;
let ui = new UIManager();
let apple = new Food(BLOCK_SIZE);
let lemon = new Food(BLOCK_SIZE, 'lemon', '#FFFF33', '<i class="fa-solid fa-lemon"></i>');
let carrot = new Food(BLOCK_SIZE, 'carrot', '#FF7733', '<i class="fa-solid fa-carrot"></i>');
let snake = new Snake(BLOCK_SIZE, BLOCK_NUM);

let lost = false;

function processInput(e) {
    if (e.key === 'R' || e.key === 'r') reset();
    else if (e.key === 'ArrowUp' || e.key === 'W' || e.key === 'w') snake.goUp();
    else if (e.key === 'ArrowRight' || e.key === 'D' || e.key === 'd') snake.goRight();
    else if (e.key === 'ArrowDown' || e.key === 'S' || e.key === 's') snake.goDown();
    else if (e.key === 'ArrowLeft' || e.key === 'A' || e.key === 'a') snake.goLeft();
}

function collision() {
    if (snake.possitionX < 0 || snake.possitionX > BLOCK_NUM - 1) lose();
    if (snake.possitionY < 0 || snake.possitionY > BLOCK_NUM - 1) lose();

    foodCollision(apple);
    foodCollision(lemon);
    foodCollision(carrot);

    snake.body.forEach((part, index) => {
        if (index > 1)
            if (snake.possitionX === part[0] && snake.possitionY === part[1])
                lose();
    });
}

function foodCollision(food) {
    if (snake.possitionX === food.possitionX & snake.possitionY === food.possitionY) {
        const foodDiv = document.querySelector(food.classQuery);
        if (foodDiv) foodDiv.remove();

        speedUp();
        snake.grow();
        ui.addScore();
        if (snake.body.length == BLOCK_NUM * BLOCK_NUM) win();

        food.spawn(ui.canvas, randomCoords(snake.body), snake.body.length);
    }
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
    if (!lost) {
        console.log('YOU LOSE');
        snake.kill();
        speed = SPEED_BASE;
        ui.setMsg('Press R to reset!');
        lost = true;
    }
}
function reset() {
    snake.reset();
    ui.resetScore();
    ui.setMsg(`HIGH SCORE: ${ui.highScore}`);
    lost = false;
}

function speedUp() {
    speed += SPEED_STEP;
    console.log('SPEED', speed);
}

function update() {
    const time = Date.now();
    if (timer < time) {
        timer = time + 1000 / speed;
        if (!lost) {
            snake.move();
            snake.draw(ui.canvas);
            collision();
        }
    }
    window.requestAnimationFrame(update);
}

function main() {
    ui.drawCanvas(`build: ${BUILD_VERSION}`);
    apple.spawn(ui.canvas, randomCoords(snake.body), snake.body.length);
    lemon.spawn(ui.canvas, randomCoords(snake.body), snake.body.length);
    carrot.spawn(ui.canvas, randomCoords(snake.body), snake.body.length);
    update();
}
main();

window.addEventListener('keydown', (e) => processInput(e));

// helpers
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
