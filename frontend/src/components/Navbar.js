import React, {Fragment, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faEnvelopeOpen, faSignOutAlt, faUserShield} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {Nav, Image, Navbar, Dropdown, Container} from '@themesberg/react-bootstrap';
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import {logout} from "../actions/auth";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Routes} from "../routes";


const NavBar = ({logout}) => {

    const [userLogged, setUserLogged] = useState([])
    const [carteira, setCarteira] = useState([])

    useEffect(() => {
        const loadData = () => {
            // api for auth
            fetch('http://localhost:8000/api/user/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(response => response.json())
                .then(data => setUserLogged(data))
                .catch(err => {
                    console.log('Navbar.js - Auth', err)
                })
            // api for get total value
            fetch('http://localhost:8000/assets/carteira/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(response => response.json())
                .then(data => setCarteira(data))
                .catch(err => {
                    console.log('Navbar.js - Carteira', err)
                })
        }
        loadData()
    }, [])

    const [redirect, setRedirect] = useState(false)
    const logout_user = () => {
        logout();
        setRedirect(true)
    };

    const totalCarteira = carteira.map(c => c.valor_total)

    return (
        <Fragment>
            <Navbar className="ps-0 pe-2 pb-0">
                <Container fluid className="px-0">
                    <div className="d-flex justify-content-between w-100">
                        <div className="d-flex align-items-start">
                            <Nav className="align-items-center">Total:&nbsp;<b>R$ {totalCarteira}</b></Nav>
                        </div>
                        <Nav className="align-items-center">
                            <Dropdown as={Nav.Item}>
                                <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                                    <div className="media d-flex align-items-center">
                                        <Image src={Profile3} className="user-avatar md-avatar rounded-circle"/>
                                        <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                                            <span
                                                className="mb-0 font-small fw-bold">{userLogged.first_name} {userLogged.last_name}</span>
                                        </div>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                                    <Dropdown.Item className="fw-bold">
                                        <FontAwesomeIcon icon={faUserCircle} className="me-2"/> My Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item className="fw-bold" as={Link} to={Routes.Settings.path}>
                                        <FontAwesomeIcon icon={faCog} className="me-2"/> Settings
                                    </Dropdown.Item>
                                    <Dropdown.Item className="fw-bold">
                                        <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2"/> Messages
                                    </Dropdown.Item>
                                    <Dropdown.Item className="fw-bold">
                                        <FontAwesomeIcon icon={faUserShield} className="me-2"/> Support
                                    </Dropdown.Item>
                                    <Dropdown.Item className="fw-bold" onClick={logout_user}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2"/> Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </div>
                </Container>
            </Navbar>
            {redirect ? <Redirect to='/login'/> : null}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(NavBar)