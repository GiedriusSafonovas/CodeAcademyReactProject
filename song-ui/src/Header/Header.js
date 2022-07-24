import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {logout} from "../utils/Logout";

const Header = () => {

    const user = useSelector(state => state.user)

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Homepage</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link to="/addsong" as={NavLink}>Add Song</Nav.Link>
                        <Nav.Link to="/songlist" as={NavLink}>Songs</Nav.Link>
                        <NavDropdown title="Language" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    {
                        !user.username ?
                            <>
                                <Nav.Link to="/login" as={NavLink}>Login</Nav.Link>
                                <Nav.Link to="/register" as={NavLink}>Register</Nav.Link>
                            </>
                            :
                            <Nav.Link onClick={() => logout('user')} href="/">Logout</Nav.Link>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header