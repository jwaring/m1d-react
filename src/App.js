/**
 * Copyright (C) 2019, SoftWaring Solutions ATF The Miss Trust
 */
import React from 'react';
import './App.css';

import M1D from './M1D';
import M1DSettings from './M1DSettings';
import {Row, Container, Col, Navbar} from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.settingsChanged = this.settingsChanged.bind(this);

        this.state = {
            length: 10000,
            ncells: 100,
            fcoeff: 0.00000,
            forcingSpec: 3
        };
    }

    settingsChanged(values) {
        this.setState(values);
    }

    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand>
                        <img
                            src="sws.png"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Text>1D Hydrodynamic Model</Navbar.Text>
                </Navbar>
                <Container>
                    <Row>
                        <Col>
                            <M1DSettings length={this.state.length}
                                         ncells={this.state.ncells}
                                         fcoeff={this.state.fcoeff}
                                         forcingSpec={this.state.forcingSpec}
                                         onChange={this.settingsChanged}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <M1D length={this.state.length}
                                 ncells={this.state.ncells}
                                 fcoeff={this.state.fcoeff}
                                 forcingSpec={this.state.forcingSpec}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{fontSize: 'smaller'}}>
                                Click on the wave to suspend and resume
                            </p>
                        </Col>
                    </Row>
                </Container>
                <div className="fixed-bottom">
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Text>Copyright (C) 2019, SoftWaring Solutions ATF The Miss Trust</Navbar.Text>
                    </Navbar>
                </div>
            </>
        );
    }
}

export default App;
