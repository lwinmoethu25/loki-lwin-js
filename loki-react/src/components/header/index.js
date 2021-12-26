import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import SearchBox from '../searchBox/index';
import * as routes from '../../store/constants/routes';
import '../style.css';

const Header = () => {
  const userAuthData = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const { userInfo } = userAuthData;

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={routes.HOME}>
            <Navbar.Brand>LOKI PET STORE</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to={routes.CART}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>{' '}
                  {cartItems.length > 0 && (
                    <span className="cart">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                  )}
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to={routes.HOME}>
                <Nav.Link>HOME</Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.role === 'user' && (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={routes.PROFILE}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.LOGOUT}>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* {!userInfo && (
                <LinkContainer to={routes.SIGNIN}>
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )} */}

              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title={userInfo.name + ' (Admin)'} id="adminMenu">
                  <LinkContainer to={routes.PRODUCTS}>
                    <NavDropdown.Item>Manage Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.PROFILE}>
                    <NavDropdown.Item>Admin Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.LOGOUT}>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
