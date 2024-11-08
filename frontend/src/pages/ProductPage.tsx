import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductsByTitle } from "../hooks/ProductHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/Error";
import { Col, Row, ListGroup, Card, Badge, Button } from "react-bootstrap";

export default function ProductPage() {

  const params = useParams()
  const {title} = params

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsByTitle(title!)

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

            <ListGroup.Item>
              Price: {product.price}€
            </ListGroup.Item>

          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>{product.price}</Col>
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
                          <Button variant="primary">Add to cart</Button>
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
