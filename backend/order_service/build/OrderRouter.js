"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const OrderModel_1 = require("./OrderModel");
exports.orderRouter = express_1.default.Router();
const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:7000/products';
//GET all orders
exports.orderRouter.get('/', (0, express_async_handler_1.default)(async (req, res) => {
    const orders = await OrderModel_1.OrderModel.find();
    res.json(orders);
}));
//GET orders by a specific username 
exports.orderRouter.get('/:user', (0, express_async_handler_1.default)(async (req, res) => {
    const { user } = req.params;
    const orders = await OrderModel_1.OrderModel.find({ user: user });
    if (!orders) {
        res.status(404).json({ message: "No orders found for this user." });
    }
    else {
        res.json(orders);
    }
}));
//GET order based on its ID
exports.orderRouter.get('/order/:id', (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await OrderModel_1.OrderModel.findById(id).populate('orderItems.productID');
        if (!order) {
            res.status(404).json({ message: "Order not found" });
        }
        else {
            res.status(200).json(order);
        }
    }
    catch (error) {
        next(error); // Pass error to the global error handler
    }
}));
//POST new order from a customer
exports.orderRouter.post('/', (0, express_async_handler_1.default)(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).json({ message: 'Cart is empty' });
    }
    else {
        const createdOrder = await OrderModel_1.OrderModel.create({
            orderItems: req.body.orderItems.map((x) => ({
                ...x,
                product: x._id
            })),
            user: req.body.user,
            totalPrice: req.body.totalPrice,
            date: req.body.date,
        });
        res.status(201).json({ message: 'Order Created', order: createdOrder });
    }
}));
exports.default = exports.orderRouter;
