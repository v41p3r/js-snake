class Apple {
    #possition = [14, 10];
    #canvasWidth = 20;
    #canvasHeight = 20;
    #bodyW = 40;

    constructor(b, w, h) {
        this.#bodyW = b;
        this.#canvasWidth = w;
        this.#canvasHeight = h;
    }

    #drawApple(canvas) {
        const div = document.createElement('div');
        div.className = 'apple';
        div.style.width = `${this.#bodyW}px`;
        div.style.height = `${this.#bodyW}px`;
        div.style.left = `${this.#bodyW * this.#possition[0]}px`;
        div.style.top = `${this.#bodyW * this.#possition[1]}px`;
        canvas.appendChild(div);
    }

    spawnApple(canvas) {
        const apple = document.querySelector('.apple');
        if (apple) apple.remove();

        this.#possition[0] = getRandomInt(0, this.#canvasWidth);
        this.#possition[1] = getRandomInt(0, this.#canvasHeight);
        this.#drawApple(canvas);
    }

    get possitionX() {
        return this.#possition[0];
    }

    get possitionY() {
        return this.#possition[1];
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
