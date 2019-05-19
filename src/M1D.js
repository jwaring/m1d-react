import React from 'react';
import './M1D.css';
import Wave from './Wave';
import HD1DConfig from "./HD1DConfig";


class M1D extends React.Component {

  constructor(prop) {
    super(prop);
    this.intervalId = null;
    this.config = new HD1DConfig();
    this.config.setSpecification(3);
  }

  componentDidMount() {
    let canvas = document.getElementById("wave");
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;

    this.wave = new Wave(canvas, this.config);
    this.startWave(25);
  }

  setCanvasSize(width, height) {
    document.getElementById('wave').width = width;
    document.getElementById('wave').height = height;
  }

  restartWave(updatePeriod) {
    this.suspendWave();

    this.wave.reset(this.config);
    this.intervalId = setInterval(this.drawWave, Math.min(Math.max(1, updatePeriod), 5000), this);
  }

  startWave(updatePeriod) {
    this.suspendWave();
    this.intervalId = setInterval(this.drawWave, Math.min(Math.max(1, updatePeriod), 5000), this);
  }

  suspendWave() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resumeWave() {
    return this.startWave(25);
  }

  changeWaveRefresh(updatePeriod) {
    this.suspendWave();
    this.resumeWave(updatePeriod);
  }

  setComputationsPerDraw(cpd)  {
    this.stepsPerDraw = Math.min(Math.max(1, cpd), 10);
  }

  drawWave(self) {
    self.wave.step();
  }

  render() {
    let changeWaveStateClick = () => {
      if (this.intervalId !== null) {
        this.suspendWave();
      } else {
        this.resumeWave();
      }
    };

    return (
        <div className="m1d">
          <canvas id="wave"
                  onClick={changeWaveStateClick}>
            Channel Model Display Pane
          </canvas>
        </div>
    );
  }

}

export default M1D;
