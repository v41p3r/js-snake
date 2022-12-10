class Food {
    #possition = [14, 10];
    #bodyW = 40;
    #class;
    #color;
    #icon;

    constructor(b, n = 'apple', c = '#FF3333', i = '<i class="fas fa-apple-alt"></i>',) {
        this.#bodyW = b;
        this.#class = n;
        this.#color = c;
        this.#icon = i;
    }

    spawn(canvas, coords, score) {
        this.#possition = coords;
        const div = document.createElement('div');
        div.classList.add('food', this.#class);
        div.style.color = this.#color;
        div.style.width = `${this.#bodyW}px`;
        div.style.height = `${this.#bodyW}px`;
        div.style.left = `${this.#bodyW * coords[0]}px`;
        div.style.top = `${this.#bodyW * coords[1]}px`;
        div.style.textAlign = 'center';
        div.style.fontSize = `${this.#bodyW - 4}px`;
        div.innerHTML = this.#icon;
        canvas.appendChild(div);
    }

    get classQuery() {
        return `.${this.#class}`;
    }

    get possitionX() {
        return this.#possition[0];
    }

    get possitionY() {
        return this.#possition[1];
    }
}