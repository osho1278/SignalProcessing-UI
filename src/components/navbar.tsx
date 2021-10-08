import React from 'react';
import { items } from '../store/items';
import { observer } from 'mobx-react';
import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';

import Nav from 'react-bootstrap/Nav';
import { auth } from '../store/auth';

export class CustomNavbar extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/main">Signal Processing</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/main">Home</Nav.Link>
                            {/* <Nav.Link href="/editor">Custom Code</Nav.Link> */}
                            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#login">Osho</a>
                            </Navbar.Text>
                            <Nav.Link href="/login" onClick={()=>auth.logout()}>Logout</Nav.Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <br />
            </div>
        )
    }
}