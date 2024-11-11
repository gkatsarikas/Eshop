import dotenv from 'dotenv'
import express, {Request,Response} from 'express'
import mongoose, { mongo } from 'mongoose'
import { orderRouter } from './OrderRouter'
import cors from 'cors'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ordersDB'

mongoose.set('strictQuery',true);

mongoose.connect(MONGODB_URI).then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch(
    () => {
        console.log('Could not connect to MongoDB');
    }
);




const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/orders',orderRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})