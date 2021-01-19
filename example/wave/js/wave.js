import {
    Point
} from './point.js';

export class Wave {
    constructor(index, totalPoints, color){
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;
        
        this.pointGap = this.stageWidth / (this.totalPoints - 1);// 점 사이에 적용되는 일정 간격

        this.init();
    }

    init() {
        this.points = [];

        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,// wave에 적용되는 index 값에 차이를 줌(Point 클래스 내부에서 y값을 결정 짓는데 사용됨)
                this.pointGap * i,// 일정 간격 값을 통해 초기 x 위치 설정
                this.centerY// 화면(stage)의 y축 중앙에 위치 설정
            );
            this.points[i] = point;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
            // points 배열에 존재하는 점의 중점 값들을 그 사이에 있는 points의 요소인 점을
            // control 점으로 하여 곡선으로 잇는다.
            // https://www.w3schools.com/tags/canvas_quadraticcurveto.asp

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);// 마지막 점에 연결한다.
        ctx.lineTo(this.stageWidth, this.stageHeight);// 우하단에 선을 연결
        ctx.lineTo(this.points[0].x, this.stageHeight);// 좌하단에 선을 연결
        ctx.fill();
        ctx.closePath();
    }
}