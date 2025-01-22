import { useContext } from "react";
import { Navbar, Container, Nav, Badge, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/AuthHook";
import SearchBar from "./components/SearchBar";
import { Store } from "./Store";

function App() {
  const { isLoggedIn, logout } = useAuth(); // Use global auth state
  const {
    state: { cart },
  } = useContext(Store);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Use logout from AuthContext
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>MyEshop</Navbar.Brand>
            </LinkContainer>
            <SearchBar />
            <Nav className="ms-auto d-flex align-items-center">
              {/* Cart Link */}
              <Link to="/cart" className="nav-link d-flex align-items-center me-3">
                <i className="bi bi-cart" style={{ fontSize: "1.25rem" }}></i>
                {cart.cartItems.length > 0 && (
                  <Badge bg="danger" pill className="ms-1">
                    {cart.cartItems.reduce((a, c) => a + c.amount, 0)}
                  </Badge>
                )}
              </Link>

              {/* User Profile Dropdown */}
              <Dropdown align="end" className="me-3">
                <Dropdown.Toggle variant="dark" id="dropdown-basic" className="d-flex align-items-center">

                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {isLoggedIn ? (
                    <>
                      <Dropdown.Item as={Link} to="/profile">
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item as={Link} to="/login">
                      Login
                    </Dropdown.Item>
                  )}
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
