/**
 * Copyright (C) 2019, SoftWaring Solutions ATF The Miss Trust
 */
import React from 'react';
import {Button, ButtonGroup, Card} from "react-bootstrap";
import NumberFormat from 'react-number-format';

let TangleText = require('react-tangle-text');

let nCellsStyle = {
    border: 0,
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    textAlign: 'center',
    cursor: 'col-resize',
    color: 'blue',
    borderBottom: '1px dashed blue',
    display: 'inline',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    padding: 'none',
    width: 40
};

let frictionStyle = {
    border: 0,
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    textAlign: 'center',
    cursor: 'col-resize',
    color: 'blue',
    borderBottom: '1px dashed blue',
    display: 'inline',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    padding: 'none',
    width: 80
};

/**
 * 1-dimensions model component. Control the start and stopping of the model
 * and updating of the model parameters (e.g. friction, boundary conditions, dx and dt etc).
 *
 * @author Jason Waring
 */
class M1DSettings extends React.Component {

    constructor(props) {
        super(props);

        this.changeNumberOfCells = this.changeNumberOfCells.bind(this);
        this.changeFrictionCoeff = this.changeFrictionCoeff.bind(this);
        this.changeForcing = this.changeForcing.bind(this);
        this.forcingStyle = this.forcingStyle.bind(this);

        this.state = {
            length: props.length,
            ncells: props.ncells,
            dx: props.length / props.ncells,
            dt: 1,
            fcoeff: props.fcoeff,
            forcingSpec: props.forcingSpec
        };
    }


    // Capture a change in the number of cells along the channel. Notify parent.
    changeNumberOfCells(n) {
        this.setState({
            ncells: n,
            dx: this.state.length / n,
            dt: (1 / 100.0) * this.state.length / n,
        }, () => {
            this.props.onChange(this.state);
        });
    }

    // Capture a change in the friction coefficient along the channel. Notify parent.
    changeFrictionCoeff(fc) {
        this.setState({
            fcoeff: fc
        }, () => {
            this.props.onChange(this.state);
        });
    }

    // Capture a change in the boundary forcing function. Notify parent.
    changeForcing(f) {
        console.log(this.toForcingSpec(f.target.id));
        this.setState({
            forcingSpec: this.toForcingSpec(f.target.id)
        }, () => {
            this.props.onChange(this.state);
        });
    }

    render() {
        let formatFriction = function (v) {
            return v.toFixed(5);
        };

        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        Channel Wave
                    </Card.Title>
                    <Card.Text>
                        A 1-dimensional depth-averaged hydrodynamic model
                        representation of a channel <b><NumberFormat value={this.state.length} displayType={'text'} thousandSeparator={true}/>m</b> long, divided into&nbsp;
                        <TangleText value={this.state.ncells} pixelDistance={10} style={nCellsStyle} onChange={this.changeNumberOfCells} min={20} max={500} step={10}/>
                        cells. Each cell is <b><NumberFormat value={this.state.dx} displayType={'text'} decimalScale={0} thousandSeparator={true}/>m</b> long and
                        the model is forward time-stepped at <b><NumberFormat value={this.state.dt} displayType={'text'} decimalScale={2} thousandSeparator={true}/>s</b>.
                    </Card.Text>
                    <Card.Text>
                        A friction coefficient of <TangleText value={this.state.fcoeff} pixelDistance={2} style={frictionStyle} onChange={this.changeFrictionCoeff} format={formatFriction}
                                                              min={0.00000} max={0.01} step={0.00001}/>
                        is being applied.
                    </Card.Text>
                    <div>
                        The boundary forcing method is&nbsp;
                        <ButtonGroup aria-label="Boundary forcing" size="sm">
                            <Button id="bc-0" variant={this.forcingStyle(0)} onClick={this.changeForcing}>Cosine</Button>
                            <Button id="bc-1" variant={this.forcingStyle(1)} onClick={this.changeForcing}>Triangle</Button>
                            <Button id="bc-2" variant={this.forcingStyle(2)} onClick={this.changeForcing}>Square</Button>
                            <Button id="bc-3" variant={this.forcingStyle(3)} onClick={this.changeForcing}>Phased</Button>
                        </ButtonGroup>
                    </div>
                </Card.Body>
            </Card>
        );
    }


    // PRIVATE
    forcingStyle(key) {
        return (key === this.state.forcingSpec) ? "primary" : "secondary";
    }

    toForcingSpec(id) {
        switch (id) {
            case "bc-0": return 0;
            case "bc-1": return 1;
            case "bc-2": return 2;
            default: return 3;
        }
    }
}

export default M1DSettings;
