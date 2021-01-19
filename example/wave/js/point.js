export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.1;
        this.cur = index;// index 값이 초기 cur 값이 됨
        this.max = Math.random() * 100 + 150;// random 값: 150 ~ 250(random 값을 적용하여 포물선 모양이 약간 일그러진 자유로운 모양을 의도)
    }

    update() {
        this.cur += this.speed;// update() 호출 시 마다 speed 값이 더해짐
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);// this.cur 값이 update() 호출될 때마다 y의 값을 결정함.
        // speed 값이 커질 수록 cur 값이 커지면서 y의 값의 변동폭이 커짐. 점의 y값 위치의 변화 폭이 커지니 점이 빠르게 움직이는 것처럼 보일 것임.
    }
}