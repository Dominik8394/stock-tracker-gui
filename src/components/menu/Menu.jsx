import React from 'react';

// Bootstrap imports
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Menu.css';

// Context imports
import { useAuth } from '../../contexts/AuthContext';

const Menu = () => {


    const { currentUser } = useAuth();
    let loggedInLabel = 'login';
    let url = '/' +  loggedInLabel;

    return (
        <Navbar className="navbar-bg" variant="dark" >
            <Container style={{ "maxWidth": "95%" }}>
                <Navbar.Brand href="#home">
                    Stock Tracker
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Willkommen, {currentUser.email} </Nav.Link>
                    <Nav.Link href="/">Dashboard</Nav.Link>
                    {
                        currentUser ?
                            (
                                console.log("user: ", currentUser),
                                console.log("url: ", url),
                                loggedInLabel = 'logout',
                                <Nav.Link href={url}>
                                    {loggedInLabel}
                                </Nav.Link>
                            )
                            : loggedInLabel
                    }

                </Nav>
            </Container>
        </Navbar>
    )
}

export default Menu;