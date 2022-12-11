class Snake {
    #snakeArr = [[0, 0]];
    #snakeMov = [[1, 0], [1, 0]];
    #lastDir = [1, 0];
    #bodyW = 40;
    #canvasH = 20;
    #willDie = false;
    #dead = false;

    constructor(w, h) {
        this.#bodyW = w;
        this.#canvasH = h;
    }

    #createSnakeHead(coords) {
        const div = document.createElement('div');
        div.className = 'part';
        if (this.#willDie)
            div.classList.add('danger');
        div.style.width = `${this.#bodyW}px`;
        div.style.height = `${this.#bodyW}px`;
        div.style.left = `${this.#bodyW * coords[0]}px`;
        div.style.top = `${this.#bodyW * coords[1]}px`;
        div.style.zIndex = '420';

        return div;
    }

    #createSnakePart(coords, prev) {
        const margin = Math.floor(this.#bodyW / 12);
        const div = document.createElement('div');
        div.className = 'part';
        div.style.width = `${this.#bodyW}px`;
        div.style.height = `${this.#bodyW - margin * 2}px`;
        div.style.left = `${this.#bodyW * coords[0]}px`;
        div.style.top = `${this.#bodyW * coords[1] + margin}px`;

        if (prev[0] === coords[0] - 1 && prev[1] === coords[1])
            div.style.backgroundColor = '#A33';
        else if (prev[0] === coords[0] && prev[1] === coords[1] + 1) {
            div.style.backgroundColor = '#3A3';
            div.style.transform = 'rotate(90deg)';
        }
        else if (prev[0] === coords[0] + 1 && prev[1] === coords[1])
            div.style.backgroundColor = '#33A';
        else if (prev[0] === coords[0] && prev[1] === coords[1] - 1) {
            div.style.backgroundColor = '#AA3 ';
            div.style.transform = 'rotate(270deg)';
        }

        return div;
    }

    draw(canvas) {
        const snakeParts = document.querySelectorAll('.part');
        snakeParts.forEach(part => part.remove());

        this.#snakeArr.forEach((part, index) => {
            if (index === 0)
                canvas.appendChild(this.#createSnakeHead(part));
            else
                canvas.appendChild(this.#createSnakePart(part, this.#snakeArr[index - 1]));
        });
    }

    #completeMove() {
        if (this.#snakeMov.length) {
            this.#lastDir = [...this.#snakeMov[0]];
            this.#snakeMov.shift();
        }

        for (let i = this.#snakeArr.length - 1; i > 0; i--) {
            this.#snakeArr.splice(i, 1, [...this.#snakeArr[i - 1]]);
        }
        this.#snakeArr[0][0] += this.#lastDir[0];
        this.#snakeArr[0][1] += this.#lastDir[1];
    }


    kill() {
        this.#dead = true;
    }

    reset() {
        this.#snakeArr = [[0, 0]];
        this.#snakeMov = [[1, 0]];
        this.#willDie = false;
        this.#dead = false;
    }

    move() {
        if (!this.#dead)
            if (!this.#willDie) {
                let tempDir = this.#lastDir;
                if (this.#snakeMov.length) {
                    tempDir = [...this.#snakeMov[0]];
                }

                const tempY = this.#snakeArr[0][0] + this.#lastDir[0];
                const tempX = this.#snakeArr[0][1] + this.#lastDir[1];

                let tempDie = false;

                if (tempX < 0 || tempX > this.#canvasH - 1 || tempY < 0 || tempY > this.#canvasH - 1) tempDie = true;

                this.#snakeArr.forEach(part => {
                    if (part[0] === tempY && part[1] === tempX)
                        tempDie = true;
                });

                if (tempDie) {
                    this.#willDie = true;
                    if (this.#snakeMov.length === 2)
                        this.#snakeMov.shift();
                } else
                    this.#completeMove();
            }
            else {
                this.#completeMove();
                this.#willDie = false;
            }
    }

    #addDir(dir) {
        const lastInverted = this.#lastDir.map(el => el * -1);
        if (this.#willDie) {
            if (dir[0] !== lastInverted[0] || dir[1] !== lastInverted[1])
                this.#snakeMov = [dir];
        } else {
            if (this.#snakeMov.length === 0) {
                if (dir[0] !== lastInverted[0] || dir[1] !== lastInverted[1])
                    this.#snakeMov.push(dir);
            }
            else {
                const lastInverted = [...this.#snakeMov[0]].map(el => el * -1);
                if (dir[0] !== lastInverted[0] || dir[1] !== lastInverted[1])
                    if (this.#snakeMov.length === 1)
                        this.#snakeMov.push(dir);
                    else if (this.#snakeMov.length === 2)
                        this.#snakeMov[1] = dir;
            }
        }
    }

    grow() {
        this.#snakeArr.push(this.#snakeArr[this.#snakeArr.length - 1]);
    }

    goUp() {
        this.#addDir([0, -1]);
    }
    goRight() {
        this.#addDir([1, 0]);
    }
    goDown() {
        this.#addDir([0, 1]);
    }
    goLeft() {
        this.#addDir([-1, 0]);
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