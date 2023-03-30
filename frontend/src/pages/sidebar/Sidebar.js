import React, {useState} from "react";
import SimpleBar from 'simplebar-react';
import {Link, useLocation} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartPie, faHandHoldingUsd, faList, faPlus, faSignOutAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Accordion, Badge, Button, Image, Nav, Navbar} from '@themesberg/react-bootstrap';

import {Routes} from "../../routes";
import ReactHero from "../../assets/img/technologies/react-hero-logo.svg";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";

export default (props = {}) => {
    const location = useLocation();
    const {pathname} = location;
    const [show, setShow] = useState(false);
    const showClass = show ? "show" : "";

    const onCollapse = () => setShow(!show);

    const CollapsableNavItem = (props) => {
        const {eventKey, title, icon, children = null} = props;
        const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

        return (
            <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
                <Accordion.Item eventKey={eventKey}>
                    <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon}/> </span>
              <span className="sidebar-text">{title}</span>
            </span>
                    </Accordion.Button>
                    <Accordion.Body className="multi-level">
                        <Nav className="flex-column">
                            {children}
                        </Nav>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    };

    const NavItem = (props) => {
        const {
            title,
            link,
            external,
            target,
            icon,
            image,
            badgeText,
            badgeBg = "secondary",
            badgeColor = "primary"
        } = props;
        const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
        const navItemClassName = link === pathname ? "active" : "";
        const linkProps = external ? {href: link} : {as: Link, to: link};

        return (
            <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
                <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon}/> </span> : null}
              {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon"/> : null}

              <span className="sidebar-text">{title}</span>
          </span>
                    {badgeText ? (
                        <Badge pill bg={badgeBg} text={badgeColor}
                               className="badge-md notification-count ms-2">{badgeText}</Badge>
                    ) : null}
                </Nav.Link>
            </Nav.Item>
        );
    };

    return (
        <>
            <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
                <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
                    <Image src={ReactHero} className="navbar-brand-light"/>
                </Navbar.Brand>
                <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
                    <span className="navbar-toggler-icon"/>
                </Navbar.Toggle>
            </Navbar>
            <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
                <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
                    <div className="sidebar-inner px-4 pt-3">
                        <div
                            className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                            <div className="d-flex align-items-center">
                                <div className="d-block">
                                    <h6>Hi, Jane</h6>
                                    <Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path}
                                            className="text-dark">
                                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2"/> Sign Out
                                    </Button>
                                </div>
                            </div>
                            <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Nav.Link>
                        </div>
                        <Nav className="flex-column pt-3 pt-md-0">
                            <NavItem title="Resumo" icon={faChartPie} link={Routes.DashboardOverview.path}/>
                            <NavItem title="Ativos" icon={faHandHoldingUsd} link={Routes.AssetsList.path}/>
                            <NavItem title="Extrato" icon={faList} link={Routes.Transactions.path}/>
                            <NavItem title="Adicionar" icon={faPlus} link={Routes.AddTransaction.path}/>
                            <NavItem title="Perfil" icon={faUserCircle} link={Routes.Settings.path}/>
                        </Nav>
                    </div>
                </SimpleBar>
            </CSSTransition>
        </>
    );
};