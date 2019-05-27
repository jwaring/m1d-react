/**
 * Copyright (C) 2019, SoftWaring Solutions ATF The Miss Trust
 */
import React from 'react';
import './M1D.css';
import Wave from './Wave';
import HD1DConfig from "./HD1DConfig";

/**
 * 1-dimensions model component. Control the start and stopping of the model
 * and updating of the model parameters (e.g. friction, boundary conditions, dx and dt etc).
 *
 * @author Jason Waring
 */
class M1D extends React.Component {

  constructor(props) {
    super(props);
    this.intervalId = null;
    this.config = new HD1DConfig();
    this.updateConfig(this.config, props);
    this.changeWaveStateClick = this.changeWaveStateClick.bind(this);
  }

  componentDidMount() {
    let canvas = document.getElementById("wave");
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;

    this.wave = new Wave(canvas, this.config);
    this.startWave(25);
  }

  shouldComponentUpdate(nextProps) {
    this.suspendWave();
    this.updateConfig(this.config, nextProps);
    this.restartWave(25);
    return true;
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

  changeWaveStateClick() {
    if (this.intervalId !== null) {
      this.suspendWave();
    } else {
      this.resumeWave();
    }
  }

  render() {
    return (
        <div className="m1d">
          <canvas id="wave" onClick={this.changeWaveStateClick}>
            Channel Model Display Pane
          </canvas>
        </div>
    );
  }

  // PRIVATE
  updateConfig(config, props) {
      config.ncells = props.ncells;
      config.dx = props.length / config.ncells;
      config.dt = (1/100.0) * config.dx;
      config.fCoeff = props.fcoeff;
      config.setSpecification(props.forcingSpec);
  }

}

export default M1D;
