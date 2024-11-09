import {Badge, Container, Nav, Navbar} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { Store } from './Store'
import { useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'


function App() {

  const {
    state: {cart},
    dispatch,
  } = useContext(Store)

  

  return (
    <div className='d-flex flex-column vh-100 '>
      <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>MyEshop</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
              <Link to="/cart" className="nav-link">
               Cart
               {cart.cartItems.length > 0 && (
                 <Badge bg="danger" pill>
                   {cart.cartItems.reduce((a, c) => a + c.amount, 0)}
                 </Badge>
               )}
             </Link>
          </Nav>
        </Navbar>
      </header>

      <main>
        <Container className='mt-3'>
          <Outlet />            
        </Container>

      </main>
    </div>
  )
}

export default App
