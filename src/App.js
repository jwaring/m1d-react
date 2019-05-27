/**
 * Copyright (C) 2019, SoftWaring Solutions ATF The Miss Trust
 */
import React from 'react';
import M1D from './M1D';
import M1DSettings from './M1DSettings';
import './App.css';
import {Row, Container, Col, Navbar} from 'react-bootstrap';

function App() {

    let settingsChanged = function(values) {
        console.log(values);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Text>1D Hydrodynamic Model</Navbar.Text>
            </Navbar>

            <Container>
                <Row>
                    <Col>
                        <M1DSettings length={10000} ncells={100} forcingSpec={3} onChange={settingsChanged}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <M1D/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
