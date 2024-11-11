import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { Store } from './Store';
import { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';  

function App() {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>MyEshop</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Link to="/cart" className="nav-link d-flex align-items-center">
              <i className="bi bi-cart" style={{ fontSize: '1.25rem' }}></i> {/* Cart Icon */}
              {cart.cartItems.length > 0 && (
                <Badge bg="danger" pill className="ms-1">
                  {cart.cartItems.reduce((a, c) => a + c.amount, 0)}
                </Badge>
              )}
            </Link>

            <Link to="/orders/history" className="nav-link">
              Orders
            </Link>
          </Nav>
        </Navbar>
      </header>

      <Link to="/product/create" className='add-product-button'>
        <i className='bi bi-plus-lg'></i>
      </Link>

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default App;
