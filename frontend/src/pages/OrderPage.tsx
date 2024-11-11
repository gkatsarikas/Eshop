// src/pages/OrderPage.tsx
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../hooks/OrderHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

// Assuming CartItem has an optional `img` and default quantity of 1
export default function OrderPage() {
    const { id: orderId } = useParams<{ id: string }>();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

    // Map `orderItems` to `CartItem` format
    const mappedOrderItems = order?.orderItems?.map((item) => ({
        _id: item._id,
        title: item.title,
        img: item.img || undefined,  // Assuming img is part of `productID` if populated
        amount: item.amount,
        quantity: 1,  // Defaulting to 1, if not explicitly present
        price: item.price || 0  // Defaulting price to 0 if unavailable
    })) || [];

    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{(error as Error).message}</MessageBox>
    ) : !order ? (
        <MessageBox variant="danger">Order not found</MessageBox>
    ) : (
        <div>

            <h1 className="my-3">Order Details</h1>
            <Card className="mb-3">
                <Card.Header as="h5">Order ID: {order._id}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h5>Products</h5>
                                    <ListGroup>
                                        {mappedOrderItems.length ? (
                                            mappedOrderItems.map((item) => (
                                                <ListGroup.Item key={item._id}>
                                                    <Row className="align-items-center">
                                                        <Col md={6}>
                                                            <strong>{item.title}</strong>
                                                            {item.img && <img src={item.img} alt={item.title} style={{ width: "50px", marginLeft: "10px" }} />}
                                                        </Col>
                                                        <Col md={3}>
                                                            <span>Amount: {item.amount}</span>
                                                        </Col>
                                                        <Col md={3}>
                                                            <span>Product ID: {item._id}</span>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        ) : (
                                            <p>No products in this order.</p>
                                        )}
                                    </ListGroup>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h5>Total Price</h5>
                                    <p>{order.totalPrice} €</p>
                                </ListGroup.Item>
                                
                                <ListGroup.Item>
                                    <h5>Status</h5>
                                    <p>{order.status}</p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h5>Creation Date</h5>
                                    <p>{new Date(order.date).toLocaleDateString()}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}
