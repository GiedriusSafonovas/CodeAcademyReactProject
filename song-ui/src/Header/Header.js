import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {logout} from "../utils/Logout";
import {useTranslation} from "react-i18next";

const Header = () => {

    const user = useSelector(state => state.user)

    const {t, i18n} = useTranslation()

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand to="/" as={NavLink}>{t("header:homepage")}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        {user.roles.includes("ROLE_ADMIN") &&
                        <Nav.Link to="/addsong" as={NavLink}>{t("header:addSong")}</Nav.Link>}
                        <Nav.Link to="/songlist" as={NavLink}>{t("header:songs")}</Nav.Link>
                        <NavDropdown title={t("language")} id="navbarScrollingDropdown" onSelect={(eventKey) => i18n.changeLanguage(eventKey)}>
                            <NavDropdown.Item eventKey="lt">LT</NavDropdown.Item>
                            <NavDropdown.Item eventKey="en">EN</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {
                        !user.username ?
                            <>
                                <Nav.Link to="/login" as={NavLink}>{t("login")}</Nav.Link>
                                <Nav.Link to="/register" as={NavLink}>{t("register")}</Nav.Link>
                            </>
                            :
                            <Nav.Link onClick={() => logout('user')} href="/">{t("logout")}</Nav.Link>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header