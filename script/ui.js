class UIManager {
    #body = document.querySelector('body');
    #canvas;
    #score = 0;
    #highScore = 0;

    #createCanvas() {
        const div = document.createElement('div');
        div.className = 'canvas';
        div.style.width = `${BLOCK_NUM * BLOCK_SIZE}px`;
        div.style.height = `${BLOCK_NUM * BLOCK_SIZE}px`;
        div.style.backgroundSize = `${BLOCK_SIZE}px ${BLOCK_SIZE}px`;
        return div;
    }
    #createScore(score) {
        const div = document.createElement('p');
        div.className = 'score';
        div.innerText = `${score}`;
        div.style.color = `white`;
        return div;
    }
    #createMsg(msg) {
        const div = document.createElement('p');
        div.className = 'msg';
        div.innerText = `${msg}`;
        div.style.color = `white`;
        return div;
    }
    drawCanvas(version, msg = 'HIGH SCORE: 0') {
        this.#body.appendChild(this.#createScore(version));
        this.#body.appendChild(this.#createCanvas());
        this.#canvas = document.querySelector('.canvas');
        this.#body.appendChild(this.#createMsg(msg));
    }

    addScore() {
        let score = document.querySelector('.score');
        score.innerText = `Score: ${++this.#score}`;
    }

    resetScore() {
        if (this.#highScore < this.#score)
            this.#highScore = this.#score;

        this.#score = 0;
        let score = document.querySelector('.score');
        score.innerText = `Score: ${this.#score}`;
    }

    setMsg(text) {
        let msg = document.querySelector('.msg');
        msg.innerText = text;
    }

    get highScore() {
        return this.#highScore;
    }

    get canvas() {
        return this.#canvas;
    }
}