const PI2 = Math.PI * 2;
const BOUNCE = 0.82;

export class Dot {
    constructor(x, y, radius, pixelSize, red, green, blue) {
        this.x = x;
        this.y = y;
        this.targetRadius = radius;// destination 반지름 값
        this.radius = 0;// 시작 반지름 값
        this.radiusV = 0;// 
        this.pixelSize = pixelSize;
        this.pixelSizeHalf = pixelSize / 2;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    animate(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillRect(// dot의 사각형 배경 그리기
            this.x - this.pixelSizeHalf,
            this.y - this.pixelSizeHalf,
            this.pixelSize, this.pixelSize
        );
        
        // dot의 bounce 애니메이션 - 애니메이션 라이브러리 easing에서 그저 가져다 쓰던 건데...직접 구현이라니...👍
        // accel: 가속도
        // radiusV: radius의 속도(증가 속도. targetRadius에 가까워지며 커지므로)
        // BOUNCE: bounce 인수
        // accel 값은 감소하다가 증가하기를 반복하는 가속도 값의 그래프를 가짐. 감소와 증가 폭이 점점 작아지는 형태.
        // radiusV는 accel 값이 더해지는 속도이며 bounce 인수가 1보다 작은 수이고 aceel 값도 점차 감소, 증가 폭이 줄어드는 값이므로 radiusV 값 또한 0을 중심으로 양수와 음수를 오가며 점차 0으로 수렴..
        // radius는 targeRadius 값으로 점차 수렴하는 그래프를 가짐. 검색해보니 radius가 가지는 그래프 형태를 감쇠 조화 그래프 형태로 설명 가능한 것 같음...
        // dot의 애니메이션은 아래 네줄 코드에 의해 말그대로 반지름의 크기가 targetRadius 값을 중심으로 bouncing 하며 점차 targetRadius 값으로 반지름의 크기가 수렴하는 애니메이션.
        const accel = (this.targetRadius - this.radius) / 2;
        this.radiusV += accel;
        this.radiusV *= BOUNCE;
        this.radius += this.radiusV;

        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
    }

    reset() {
        this.radius = 0;
        this.radiusV = 0;
    }
}