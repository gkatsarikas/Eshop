import { Badge, Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { Store } from './Store';
import { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';  

function App() {
  const {
    state: { cart },
  } = useContext(Store);

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>MyEshop</Navbar.Brand>
            </LinkContainer>
            <Nav className="ms-auto d-flex align-items-center">
              {/* Cart Link */}
              <Link to="/cart" className="nav-link d-flex align-items-center me-3">
                <i className="bi bi-cart" style={{ fontSize: '1.25rem' }}></i> {/* Cart Icon */}
                {cart.cartItems.length > 0 && (
                  <Badge bg="danger" pill className="ms-1">
                    {cart.cartItems.reduce((a, c) => a + c.amount, 0)}
                  </Badge>
                )}
              </Link>

              {/* Dropdown Menu with "Hamburger" Icon */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i> {/* Hamburger Icon */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/orders/history">
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/product/create">
                    Create New Product
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/product/update">
                    Update Product
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/product/delete">
                    Delete Product
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default App;
