import { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { CartItem } from '../types/Cart';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import Bootstrap Icons

export default function CartPage() {
  const navigate = useNavigate();

  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = (item: CartItem, amount: number) => {
    if (item.quantity < amount) {
      alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, amount },
    });
  };

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkOutHandler = () => {
    navigate('/order/preview');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Return</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="img-fluid rounded thumbnail"
                      />{' '}
                      <Link to={`/product/${item.title}`}>{item.title}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => updateCartHandler(item, item.amount - 1)}
                        variant="dark"
                        disabled={item.amount === 1}
                      >
                        <i className="bi bi-dash"></i>
                      </Button>{' '}
                      <span>{item.amount}</span>
                      <Button
                        onClick={() => updateCartHandler(item, item.amount + 1)}
                        variant="dark"
                        disabled={item.amount === item.quantity}
                      >
                        <i className="bi bi-plus"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}€</Col>
                    <Col md={2}>
                      <Button onClick={() => removeItemHandler(item)} variant="danger">
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.amount, 0)}{' '}
                    items) : €
                    {cartItems.reduce((a, c) => a + c.price * c.amount, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkOutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
