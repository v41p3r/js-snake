class Snake {
    #snakeArr = [[0, 0]];
    #snakeDir = [1, 0];
    #lastDir = [1, 0];
    #bodyW = 40;

    constructor(w) {
        this.#bodyW = w;
    }

    #createSnakePart(coords, prev) {
        const div = document.createElement('div');
        div.className = 'part';
        div.style.width = `${this.#bodyW}px`;
        div.style.height = `${this.#bodyW}px`;
        div.style.left = `${this.#bodyW * coords[0]}px`;
        div.style.top = `${this.#bodyW * coords[1]}px`;

        if (!prev) return div;

        if (prev[0] === coords[0] - 1 && prev[1] === coords[1])
            div.style.backgroundColor = '#A33';
        else if (prev[0] === coords[0] && prev[1] === coords[1] + 1)
            div.style.backgroundColor = '#3A3';
        else if (prev[0] === coords[0] + 1 && prev[1] === coords[1])
            div.style.backgroundColor = '#33A';
        else if (prev[0] === coords[0] && prev[1] === coords[1] - 1)
            div.style.backgroundColor = '#AA3 ';

        return div;
    }

    draw(canvas) {
        const snakeParts = document.querySelectorAll('.part');
        snakeParts.forEach(part => part.remove());

        this.#snakeArr.forEach((part, index) => {
            canvas.appendChild(this.#createSnakePart(part, this.#snakeArr[index - 1] ?? null));
        });
    }

    move() {
        this.#lastDir = [...this.#snakeDir];

        for (let i = this.#snakeArr.length - 1; i > 0; i--) {
            this.#snakeArr.splice(i, 1, [...this.#snakeArr[i - 1]]);
        }
        this.#snakeArr[0][0] += this.#snakeDir[0];
        this.#snakeArr[0][1] += this.#snakeDir[1];
    }

    kill() {
        this.#snakeArr = [[0, 0]];
        this.#snakeDir = [1, 0];
    }

    grow() {
        this.#snakeArr.push(this.#snakeArr[this.#snakeArr.length - 1]);
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

    get body() {
        return this.#snakeArr;
    }

    get possitionX() {
        return this.#snakeArr[0][0];
    }

    get possitionY() {
        return this.#snakeArr[0][1];
    }

}