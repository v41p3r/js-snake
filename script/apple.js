class Apple {
    #possition = [14, 10];
    #bodyW = 40;

    constructor(b) {
        this.#bodyW = b;
    }

    spawn(canvas, coords, score) {
        this.#possition = coords;
        const div = document.createElement('div');
        div.className = 'apple';
        div.style.width = `${this.#bodyW}px`;
        div.style.height = `${this.#bodyW}px`;
        div.style.left = `${this.#bodyW * coords[0]}px`;
        div.style.top = `${this.#bodyW * coords[1]}px`;
        div.style.textAlign = 'center';
        div.innerHTML = `<p>${score}</p>`;
        canvas.appendChild(div);
    }

    get possitionX() {
        return this.#possition[0];
    }

    get possitionY() {
        return this.#possition[1];
    }
}