import { Bubble } from './bubble.js';

const NUM_PER_SHOT = 5;

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        this.bubbles = [];

        this.isMouseDown = false;

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
        
        this.canvas.addEventListener('mousedown', this.onDownHandler.bind(this), false);
        this.canvas.addEventListener('mouseup', this.onUpHandler.bind(this), false);
        this.canvas.addEventListener('mousemove', this.onMouseMoveHandler.bind(this), false);
        this.canvas.addEventListener('click', this.onMouseClickHandler.bind(this), false);

        // mobile
        this.canvas.addEventListener('touchstart', this.onTouchHandler.bind(this), false);
        this.canvas.addEventListener('touchmove', this.onTouchHandler.bind(this), false);
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        window.requestAnimationFrame(this.animate.bind(this));
        
        this.bubbles = this.bubbles.filter(el => !el.isDead);
        for (let i = 0; i < this.bubbles.length; i++) {
            this.bubbles[i].animate(this.ctx);
        }
    }

    onDownHandler(e) {
        this.isDown = true;
    }

    onUpHandler(e) {
        this.isDown = false;
    }

    onMouseMoveHandler(e) {
        if (!this.isDown) {
            return;
        }
        const { offsetX, offsetY } = e;
        
        for (let i = 0; i < NUM_PER_SHOT; i++) {
            this.bubbles.push(new Bubble(offsetX, offsetY));
        }
    }

    onMouseClickHandler(e) {
        const { offsetX, offsetY } = e;
        
        for (let i = 0; i < NUM_PER_SHOT; i++) {
            this.bubbles.push(new Bubble(offsetX, offsetY));
        }
    }

    onTouchHandler(e) {
        e.preventDefault(); 
        const { changedTouches: touches } = e;
        for (let i = 0; i < NUM_PER_SHOT; i++) {
            for (let j = 0; j < touches.length; j++) {
                this.bubbles.push(new Bubble(touches[j].pageX, touches[j].pageY));
            }
        }
    }
}

window.onload = () => {
    new App();
};