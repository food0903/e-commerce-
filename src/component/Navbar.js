import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Form, FormControl, ListGroup } from 'react-bootstrap';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function CustomNavbar({ isLoggedIn, setIsLoggedIn }) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  useEffect(() => {
    const searchProducts = async () => {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await response.json();
      setFilteredItems(data.products);
    };
    if (query.trim() !== '') {
      searchProducts();
    } else {
      setFilteredItems([]);
    }
  }, [query]);

  return (
    <Navbar style={{ backgroundColor: '#615756' }} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">E-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Form className="d-flex position-relative">
            <FormControl
              type="search"
              placeholder="Search for products"
              className="mr-2 search-input"
              aria-label="Search"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <ListGroup as="ul">
            {filteredItems.length > 0 && (
              <div className="position-absolute bg-white p-2 mt-1" style={{ zIndex: 1000, top: 'calc(100% + 10px)', left: 0, width: '100%' }}> 
                  {filteredItems.map(item => (
                    <ListGroup.Item>
                        <Link to={`/SearchedProduct/${item.id}`}>{item.title}</Link>
                    </ListGroup.Item>
                  ))}
              </div>
            )}
            </ListGroup>
          </Form>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FaRegUser />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/cart"><MdOutlineShoppingCart /></Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
