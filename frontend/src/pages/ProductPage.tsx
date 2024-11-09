import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductsByTitle } from "../hooks/ProductHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError, toCartItem } from "../utils";
import { ApiError } from "../types/Error";
import { Col, Row, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";

export default function ProductPage() {

  const params = useParams()
  const {title} = params

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsByTitle(title!)

  const {state,dispatch} = useContext(Store)
  const {cart} = state


  const addToCart = (item:CartItem) => {
    const existingItem = cart.cartItems.find((x) => x._id === product!._id)
    const amount = existingItem ? existingItem.amount + 1 : 1

    if(product!.quantity < amount){
      alert('Sorry, the product is unavailable')
      return
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {...item,amount},
    })
    console.log('Product added to cart')
  }

  return (
    isLoading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !product ? (
      <MessageBox variant="danger">Product not found</MessageBox>
    ) :

    (
      <div>
        <Helmet>
          <title>Product page</title>
        </Helmet>
        <Row>
          <Col md={6}>
            <img src={product.img} alt={product.title} className="large" />
          </Col>
          <Col md={3}></Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.title}</title>
                </Helmet>
              </ListGroup.Item>
              <h1>{product.title}</h1>
            </ListGroup>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>{product.price}€</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item variant="flush">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.quantity > 0 ? (
                          <Badge bg="success">Available</Badge>
                        ) : (
                          <Badge bg="danger">Out of stock</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.quantity > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button variant="primary" onClick={() => addToCart(toCartItem(product))}>Add to cart</Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  )
}
