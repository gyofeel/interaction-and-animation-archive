import { randomRange } from './utils.js';

const PI2 = Math.PI * 2;
const MIN_LIFE = 2;
const MAX_LIFE = 4;
const MIN_RADIUS = 2;
const MAX_RADIUS = 50;
const MIN_WAVE_LENGTH = 100;
const MAX_WAVE_LENGTH = 200;
const MIN_AMPLITUDE = 50;
const MAX_AMPLITUDE = 400;
const MIN_SPEED = 1;
const MAX_SPEED = 10;

export class Bubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = randomRange(MIN_RADIUS, MAX_RADIUS);
        this.red = randomRange(0, 256);
        this.green = randomRange(0, 256);
        this.blue = randomRange(0, 256);
        this.life = randomRange(MIN_LIFE, MAX_LIFE);
        this.waveLength = randomRange(MIN_WAVE_LENGTH, MAX_WAVE_LENGTH);
        this.amplitude = 0;
        this.addition = randomRange(MIN_SPEED, MAX_SPEED) / 10;
        this.dx = 0;
        this.dy = 0;
        this.directionX = randomRange(1, 10) % 2 ? -1 : 1;
        this.directionY = randomRange(1, 10) % 2 ? -1 : 1;
        this.opacity = 0.6;
        this.isDead = false;
    }

    animate(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
        ctx.arc(this.x + this.dx, this.y + this.dy * this.amplitude, this.radius, 0, PI2, false);
        ctx.fill();

        if (this.amplitude < MIN_AMPLITUDE) {
            this.amplitude = Math.floor(Math.random() * (MAX_AMPLITUDE - MIN_AMPLITUDE) + 1) + MIN_AMPLITUDE;
        }
        this.dx = this.dx + this.addition * this.directionX;
        this.dy = Math.sin(this.dx / this.waveLength) * this.directionY;
        const _o = this.opacity - (this.opacity / (60 * this.life));
        this.opacity = _o < 0 ? 0 : _o;

        if (this.opacity <= 0.01) {
            this.isDead = true;
        }
    }

    getRadians(degrees) {
        return degrees * Math.PI / 180;
    }
}