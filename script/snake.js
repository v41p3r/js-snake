class Snake {
    #snakeArr = [[10, 10]];
    #snakeDir = [1, 0];
    #lastDir = [1, 0];
    #bodyW = 40;

    constructor(w) {
        this.#bodyW = w;
    }

    #createSnakePart(x, y) {
        const div = document.createElement('div');
        div.className = 'part';
        div.style.width = `${this.#bodyW}px`;
        div.style.height = `${this.#bodyW}px`;
        div.style.left = `${this.#bodyW * x}px`;
        div.style.top = `${this.#bodyW * y}px`;
        return div;
    }

    drawSnake(canvas) {
        const snakeParts = document.querySelectorAll('.part');
        snakeParts.forEach(part => part.remove());

        this.#snakeArr.forEach(part => {
            canvas.appendChild(this.#createSnakePart(...part));
        });
    }

    updateSnake() {
        this.#lastDir = [...this.#snakeDir];

        for (let i = this.#snakeArr.length - 1; i > 0; i--) {
            this.#snakeArr.splice(i, 1, [...this.#snakeArr[i - 1]]);
        }
        this.#snakeArr[0][0] += this.#snakeDir[0];
        this.#snakeArr[0][1] += this.#snakeDir[1];
    }

    growSnake() {
        this.#snakeArr.push(this.#snakeArr[0]);
    }

    goUp() {
        if (this.#lastDir[0] != 0 && this.#lastDir[1] != 1)
            this.#snakeDir = [0, -1];
    }
    goRight() {
        if (this.#lastDir[0] != -1 && this.#lastDir[1] != 0)
            this.#snakeDir = [1, 0];
    }
    goDown() {
        if (this.#lastDir[0] != 0 && this.#lastDir[1] != -1)
            this.#snakeDir = [0, 1];
    }
    goLeft() {
        if (this.#lastDir[0] != 1 && this.#lastDir[1] != 0)
            this.#snakeDir = [-1, 0];
    }

    get possitionX() {
        return this.#snakeArr[0][0];
    }

    get possitionY() {
        return this.#snakeArr[0][1];
    }

}