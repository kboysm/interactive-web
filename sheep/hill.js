export class Hill {
    constructor(color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total; // 언덕 포인트 갯수
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth
        this.stageHeight = stageHeight

        this.points = [];
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));

        for (let i=0 ; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY()
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        //The CanvasRenderingContext2D.beginPath() method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
        // 경로를 다시 그려줌
        let cur = this.points[0];
        let prev = cur;
        let dots = [];
        cur.x += this.speed;

        if(cur.x > -this.gap) {
            this.points.unshift({
                x:-(this.gap * 2),
                y: this.getY()
            })
        } else if ( cur.x > this.stageWidth + this.gap) {
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x, cur.y);
        // 선 그리기 시작 좌표 함수 , 선 그리기 위치로 이동
        let prevCx = cur.x;
        let prevCy = cur.y;

        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy); // 시작점 , 종료점 사이에 제어점 좌표를 입력하고 시작점과 종료점의 선을 곡선으로

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;

        }

        ctx.lineTo(prev.x, prev.y); // 선 그리기 종료 좌표 함수, 좌표 위치까지 선 그리기
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill(); // 지정된 색을 넣어줌

        return dots;
    }

    getY() {
        const min = this.stageHeight / 8;
        const max = this.stageWidth - min;
        return min + Math.random() * max;
    }
}