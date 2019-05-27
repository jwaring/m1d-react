/**
 * Copyright (C) 2019, SoftWaring Solutions ATF The Miss Trust
 */
import HD1D from './HD1D';
import DrawingPane from './DrawingPane';

const lower = -2.0;
const upper = 2.0;
const sky = {r:224, g:238, b:255};
const water = {r:88, g:160, b:88};
const stepsPerDraw = 2;

/**
 * Draw the wave onto the canvas.
 *
 * @author Jason Waring
 */
class Wave {

  constructor(canvas, config) {
    this.pane = new DrawingPane(canvas);
    this.m1d = new HD1D(config);
    this.left = 0.0;
    this.right = this.m1d.x[this.m1d.nxm1];
  }

  reset(config) {
    this.m1d.reset(config);
    this.left = 0.0;
    this.right = this.m1d.x[this.m1d.nxm1];
    this.pane.clear();
  }

  step() {
    let width = this.pane.width();
    let height = this.pane.height();

    // Draw sky
    this.pane.clear();
    this.pane.fillStyle(sky.r, sky.g, sky.b);
    this.pane.rect(0, 0, width, height);

    // Draw waves.
    for (var i=0; i<10; ++i) {
      this.pane.fillStyle(water.r-i*15, water.g-i*15, water.b-i*5);
      this.drawEta(i*20, 0, this.m1d.nxm1, width, height);
    }

    for (i=0; i<stepsPerDraw; ++i) {
      this.m1d.step();
    }
  }

  drawEta(yoffset, nstart, nend, width, height) {

    // Draw the eta
    var nlength = nend-nstart+1;
    var x = new Array(nlength+2);
    var y = new Array(nlength+2);

    var hdx = this.m1d.x;
    var eta = this.m1d.eta;


    x[0] = this.x_to_xf((hdx[nstart] + hdx[nstart+1])/2.0, width);
    y[0] = this.y_to_yf(eta[nstart], height) + yoffset;
    for (var i=nstart+1; i<=nend; ++i) {
      x[i-nstart] = this.x_to_xf((hdx[i] + hdx[i+1])/2.0, width);
      y[i-nstart] = this.y_to_yf(eta[i], height) + yoffset;
    }

    // Close polygon
    x[nend+1] = x[nend];
    y[nend+1] = height-1 + yoffset;
    x[nend+2] = x[nstart];
    y[nend+2] = height-1 + yoffset;

    this.pane.poly(x, y, false);
  }

  x_to_xf(x, width) {
    return width * (x-this.left)/(this.right-this.left);
  }

  y_to_yf(eta, height) {
    return height - (height * (eta-lower)/(upper-lower));
  }
}

export default Wave;
