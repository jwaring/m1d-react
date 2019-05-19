/**
 * Copyright 2019 SoftWaring Solutions Pty Ltd.
 */
class DrawingPane {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    width() {
        return this.canvas.width;
    }

    height() {
        return this.canvas.height;
    }

    fillStyle(r, g, b) {
        this.ctx.fillStyle = 'rgb(' +
            Math.min(Math.max(r, 0), 255) + ', ' +
            Math.min(Math.max(g, 0), 255) + ', ' +
            Math.min(Math.max(b, 0), 255) + ')';
    }

    circle(x, y, r) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    rect(x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.closePath();
        this.ctx.fill();
    }

    poly(x, y) {
        if (!((x.length !== y.length) || (x.length < 2))) {
            this.ctx.beginPath();
            this.ctx.moveTo(x[0], y[0]);
            for (var i = 1; i < x.length; ++i) {
                this.ctx.lineTo(x[i], y[i]);
            }
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width(), this.height());
    }
}

export default DrawingPane;