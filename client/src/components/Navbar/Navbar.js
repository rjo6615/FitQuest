import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { removeToken } from '../../useToken.js';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import logo from "./favicon.ico";


function NavbarComponent() {
   const [items, setItems] = useState([]);

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('token'));
  console.log(items.token);
  if (items) {
   setItems(items);
  }
}, []);
    return (
        <Navbar expand="lg" className="shadow-lg mb-5 bg-image">
        <Container fluid>
        <div className="logo-image" style={{width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden', marginRight: '5px'}}>
            <img src={logo} className="img-fluid" alt="logo"></img>
        </div>
          <Navbar.Brand className="text-dark" style={{fontFamily: "Shadows Into Light, cursive"}} href="*">Fit Quest</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="text-dark" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {/* <Nav.Link className="text-dark" href="/create-routine">Start your Quest</Nav.Link> */}
              {/* <Nav.Link className="text-dark" href="/showRoutines">Routines</Nav.Link>  */}
              <Nav.Link className="text-dark" href={`/single-routine/${items.token}`}>Your Profile</Nav.Link>              
            </Nav>
            <a className="text-light text-decoration-none" href="/logout"><Button className="float-end" variant="primary" onClick={removeToken}>logout</Button></a>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
}

export default NavbarComponent;