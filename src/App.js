import React from 'react';
import M1D from './M1D';
import './App.css';
import {Row, Container, Col, Navbar} from 'react-bootstrap';


function App() {
  return (
      <>
      <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand >1D Hydrodynamic Model</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>

      <Container>
          <Row>
              <Col>
                  <M1D/>
              </Col>
              <Col>2 of 2</Col>
          </Row>
      </Container>
      </>
  );
}

export default App;
