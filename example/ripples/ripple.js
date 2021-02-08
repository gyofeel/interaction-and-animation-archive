import { distance } from "./utils.js";

export class Ripple {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.maxRadius = 0;
        this.speed = 10;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth =  stageWidth;
        this.stageHeight = stageHeight;
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = this.getMax(x, y);// 화면 네 꼭지점으로 부터 가장 먼 곳까지의 거리를 ripple의 최대 반지름 값으로 한다.
    }

    animate(ctx) {
        if (this.radius < this.maxRadius) {
            this.radius += this.speed;
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.maxRadius = 0;
    }

    getMax(x, y) {
        const c1 = distance(0, 0, x, y);// 화면 좌상단으로부터의 거리
        const c2 = distance(this.stageWidth, 0, x, y);// 화면 우상단으로부터의 거리
        const c3 = distance(0, this.stageHeight, x, y);// 화면 좌하단으로부터의 거리
        const c4 = distance(this.stageWidth, this.stageHeight, x, y);// 화면 우하단으로부터의 거리
        return Math.max(c1, c2, c3, c4);
    }
}