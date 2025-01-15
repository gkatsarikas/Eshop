import { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

import { Store } from '../Store'
import { useCreateOrderMutation } from '../hooks/OrderHook'

export default function PlaceOrderPage() {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(Store)
  const { cart } = state

  // Helper function to round numbers to 2 decimal places
  const round2 = (num: number) => Math.round(num * 100) / 100 

  // Calculate total price with correct rounding for each item subtotal
  cart.totalPrice = round2(
    cart.cartItems.reduce((a, c) => a + round2(c.amount * c.price), 0)
  )

  const { mutateAsync: createOrder } = useCreateOrderMutation()

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        totalPrice: cart.totalPrice,
        user: '',
        date: new Date()
      })
      dispatch({ type: 'CART_CLEAR' })
      localStorage.removeItem('cartItems')

      alert('Order placed successfully.')
      navigate(`/order/info/${data.order._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.img}
                          alt={item.title}
                          className="img-fluid rounded thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item._id}`}>{item.title}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.amount}</span>
                      </Col>
                      <Col md={3}>{round2(item.price).toFixed(2)}€</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>{cart.totalPrice.toFixed(2)}€</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
