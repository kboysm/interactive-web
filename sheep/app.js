import { Hill } from './hill.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d") // 2차원 렌더링 컨텍스트를 나타내는 CanvasRenderingContext2D (en-US) 객체를 생성하게 합니다.
        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.4, 6)
        ];

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this)); // 비동기 , 브라우저가 실행 시기를 결정 , 모니터 주사율에 맞춰 함수를 실행
        //웹 브라우저에 프레임이라는 개념을 넣음 , setInterval 을 대체 , 성능이 상당히 좋음 , 재귀함수
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
        //The CanvasRenderingContext2D.scale() method of the Canvas 2D API adds a scaling transformation to the canvas units horizontally and/or vertically.
        for (let i= 0; i< this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        //The CanvasRenderingContext2D.clearRect() method of the Canvas 2D API erases the pixels in a rectangular area by setting them to transparent black.
        let dots;
        for (let i =0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }
    }

}

window.onload = () => {
    new App();
}