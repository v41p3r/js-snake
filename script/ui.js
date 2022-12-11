class UIManager {
    #body = document.querySelector('body');
    #canvas;

    #createCanvas() {
        const div = document.createElement('div');
        div.className = 'canvas';
        div.style.width = `${BLOCK_NUM * BLOCK_SIZE}px`;
        div.style.height = `${BLOCK_NUM * BLOCK_SIZE}px`;
        div.style.backgroundSize = `${BLOCK_SIZE}px ${BLOCK_SIZE}px`;
        return div;
    }
    #createVersion(version) {
        const div = document.createElement('p');
        div.innerText = version;
        div.style.color = `white`;
        return div;

    }
    drawCanvas(version) {
        this.#body.appendChild(this.#createCanvas());
        this.#canvas = document.querySelector('.canvas');
        this.#body.appendChild(this.#createVersion(version));
    }

    get canvas() {
        return this.#canvas;
    }
}