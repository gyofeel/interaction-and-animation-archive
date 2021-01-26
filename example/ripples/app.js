import { Ripple } from './ripple.js';
import { Dot } from './dot.js';
import { collide } from './utils.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.tmpCanvas = document.createElement('canvas');
        this.tmpCtx = this.tmpCanvas.getContext('2d');

        // devicePixelRatio는 CSS픽셀의 크기를 물리적 픽셀의 크기로 나눈 값. 즉 작은 픽셀을 가진 고해상도 화면일 수록 큰 값이 나온다.
        // 아래 코드는 FHD 이상 일때 너비, 높이 CSS 픽셀 값을 2배하고 있음.
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.ripple = new Ripple();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.radius = 10;
        this.pixelSize = 30;
        this.dots = [];

        this.isLoaded = false;
        this.imgPos = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

        this.image = new Image();
        this.image.src = 'vincent.jpeg';
        // Image 객체를 이용해 load 타이밍 체크
        this.image.onload = () => {
            this.isLoaded = true;
            this.drawImage();
        }

        window.requestAnimationFrame(this.animate.bind(this));

        this.canvas.addEventListener('click', this.onClick.bind(this), false);
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 렌더링 되는 화면에 맞게 canvas의 너비 및 높이 픽셀 크기에 배수 적용
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        // 전체 화면 픽셀 값에 배수를 해주었지만 렌더링 되는 화면에 관계 없이 동일한 비율로 화면을 나타내기 위해 scale 함수 사용
        // scale(x, y) - 1픽셀이 x, y값의 배 만큼 확대, 축소되어 표현됨
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        
        // tmpCanvas에는 왜 pixelRatio를 곱하는 처리를 하지 않았을까?
        // 1. 굳이 dot와 ripple 효과의 화질이 좋을 필요는 없다고 판단한 듯
        // 2. width, height 픽셀 크기를 늘리고 scale 처리를 하는 게 애니메이션 성능을 떨어뜨릴 듯
        this.tmpCanvas.width = this.stageWidth;
        this.tmpCanvas.height = this.stageHeight;

        this.ripple.resize(this.stageWidth, this.stageHeight);

        if (this.isLoaded) {
            this.drawImage();
        }
    }

    drawImage() {
        // 화면(viewport)의 너비/높이 비와 이미지의 너비/높이 비를 구함
        const stageRatio = this.stageWidth / this.stateHeight;
        const imgRatio = this.image.width / this.image.height;

        // 이미지 너비, 높이 값을 현재 화면에 값으로 초기화(이때는 이미지 비율이 깨지겠지)
        this.imgPos.width = this.stageWidth;
        this.imgPos.height = this.stageHeight;

        if (imgRatio > stageRatio) {// 이미지의 비가 더 클 때(즉, 이미지가 화면보다 너비가 더 큰 비율을 가지고 있을 때) ->
            this.imgPos.width = Math.round(// 이미지의 높이를 화면 높이에 맞추고, 이미지의 너비는 비율이 깨지지 않는 값을 가지도록 한다.
                this.image.width * (this.stageHeight / this.image.height)
            );
            this.imgPos.x = Math.round(// 이미지가 화면의 중앙에 위치하도록 하고 싶다. 같은 높이를 가질 때, 화면의 너비보다 이미지의 너비가 더 클것이므로 ... 
                //화면 너비에서 이미지 너비를 뺀 후 나누기 2한 값을 이미지의 y 위치 값으로 한다.
                (this.stageWidth - this.imgPos.width) / 2
            );
        } else {// 화면의 비가 더 크거나 같을 때(즉, 이미지가 화면보다 높이가 더 큰 비율을 가지고 있을 때) -> 
            this.imgPos.height = Math.round(// 이미지의 너비를 화면의 너비로 초기화 했으므로 이미지의 높이도 비율이 깨지지 않는 값을 가지도록 한다.
                this.image.height * (this.stageWidth / this.image.width)
            );
            this.imgPos.y = Math.round(// 이미지를 화면의 중앙에 위치하고자 한다. 같은 너비를 가질 때, 이미지의 높이가 화면의 높이 값보다 크므로 
                //화면의 높이 값에서 이미지의 높이 값을 뺀 후 나누기 2한 값을 이미지의 y 위치 값으로 한다.
                (this.stageHeight - this.imgPos.height) / 2
            );
        }

        this.ctx.drawImage(
            this.image,
            0, 0,
            this.image.width, this.image.height,
            this.imgPos.x, this.imgPos.y,
            this.imgPos.width, this.imgPos.height
        );

        this.tmpCtx.drawImage(
            this.image,
            0, 0,
            this.image.width, this.image.height,
            this.imgPos.x, this.imgPos.y,
            this.imgPos.width, this.imgPos.height
        );

        this.imgData = this.tmpCtx.getImageData(0, 0, this.stageWidth, this.stageHeight);

        this.drawDots();
    }

    drawDots() {
        this.dots = [];

        this.columns = Math.ceil(this.stageWidth / this.pixelSize);
        this.rows = Math.ceil(this.stageHeight / this.pixelSize);

        for (let i = 0; i < this.rows; i++) {
            const y = (i + 0.5) * this.pixelSize;
            const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

            for (let j = 0; j < this.columns; j++) {
                const x = (j + 0.5) * this.pixelSize;
                const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

                const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
                const red = this.imgData.data[pixelIndex + 0];
                const green = this.imgData.data[pixelIndex + 1];
                const blue = this.imgData.data[pixelIndex + 2];

                const dot = new Dot(
                    x, y,
                    this.radius,
                    this.pixelSize,
                    red, green, blue
                );

                this.dots.push(dot);
            }
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ripple.animate(this.ctx);

        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i];
            if (collide(
                dot.x, dot.y,
                this.ripple.x, this.ripple.y,
                this.ripple.radius
            )) {
                dot.animate(this.ctx);
            }
        }
    }

    onClick(e) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].reset();
        }

        this.ctx.drawImage(
            this.image,
            0, 0,
            this.image.width, this.image.height,
            this.imgPos.x, this.imgPos.y,
            this.imgPos.width, this.imgPos.height
        );

        this.ripple.start(e.offsetX, e.offsetY);
    }


}

window.onload = () => {
    new App();
};