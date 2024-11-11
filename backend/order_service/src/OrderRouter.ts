import express, {Response, Request, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import { Order, OrderModel } from './OrderModel'
import axios from 'axios'
import { Product } from './ProductModel'

export const orderRouter = express.Router()
const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:7000/products';

//GET all orders
orderRouter.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const orders = await OrderModel.find();
        res.json(orders);
    }))


//GET orders by a specific username 
orderRouter.get(
    '/:username',
    asyncHandler(async (req: Request, res: Response) => {
        const { username } = req.params
        const orders = await OrderModel.find({ user: username })
        if (!orders) {
            res.status(404).json({ message: "No orders found for this user." })
        } else {
            res.json(orders)
        }
    })
)

//GET order based on its ID
orderRouter.get(
  '/order/:id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id).populate('orderItems.productID');

      if (!order) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(200).json(order);
      }
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  })
);


//POST new order from a customer
orderRouter.post('/',
  asyncHandler(async (req: Request, res: Response) => {

    if(req.body.orderItems.length === 0){
      res.status(400).json({message: 'Cart is empty'})
    }

    else{

      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id
        })),
        user: req.body.user,
        totalPrice: req.body.totalPrice,
        date: req.body.date,
      } as Order)
      res.status(201).json({ message: 'Order Created', order: createdOrder })
    }
  })
)  
  
  
  export default orderRouter;
  
  
  