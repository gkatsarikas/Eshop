import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/Error";
import { Order } from "../types/Order";
import { Button } from "react-bootstrap";
import { useGetUserOrders } from "../hooks/OrderHook";

export default function UserOrdersPage() {
    const navigate = useNavigate();
    const { data: orders, isLoading, error } = useGetUserOrders();

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>

            <h1>Order History</h1>

            {isLoading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">
                    {getError(error as unknown as ApiError)}
                </MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>PRICE</th>
                            <th>VIEW DETAILS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders!.map((order: Order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => navigate(`/order/${order._id}`)}
                                    >
                                        Order details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
