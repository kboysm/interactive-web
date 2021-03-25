import { Hill } from './hill.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d") // 2차원 렌더링 컨텍스트를 나타내는 CanvasRenderingContext2D (en-US) 객체를 생성하게 합니다.
        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#ff4674', 1.4, 6)
        ];

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this. stageWidth * 2;
        this.canvas.height = this. stageHeight * 2;
        this.ctx.scale(2, 2);

        for (let i= 0; i< this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        let dots;
        for (let i =0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }
    }

}

window.onload = () => {
    new App();
}