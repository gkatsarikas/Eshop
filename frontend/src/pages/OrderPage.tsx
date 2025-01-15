import { Link, useParams } from "react-router-dom";
import { useGetOrderByID } from "../hooks/OrderHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/Error";
import { Helmet } from "react-helmet-async";
import { Card, Col, ListGroup, Row } from "react-bootstrap";


export default function OrderPage(){

    const params = useParams()
    const {id} = params

    const {
        data: order,
        isLoading,
        error,
    } = useGetOrderByID(id!)


    return isLoading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !order  ?(
        <MessageBox variant="danger">Order not found</MessageBox>
    ) : (

        <div>
            <Helmet>
                <title>Order {id}</title>
            </Helmet>
            <h1 className="my-3">Order {id}</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Order info</Card.Title>
                            <Card.Text>
                                <strong>User: {order.user}</strong>
                            </Card.Text>
                            <Card.Text>
                                <strong>Status: {order.status}</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {order.orderItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img src={item.img} alt={item.title} className="img-fluid rounded thumbnail"></img>{' '}
                                                <Link to={`/product/${item.title}`}>{item.title}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price</Col>
                                        <Col>{order.totalPrice.toFixed(2)}€</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>                        
                </Col>
            </Row>
        </div>
    )

}