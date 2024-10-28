import dotenv from 'dotenv'
import express, {Request,Response} from 'express'
import mongoose, { mongo } from 'mongoose'
import { productRouter } from './ProductRouter'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/productsDB'

mongoose.set('strictQuery',true)

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
app.use(express.json());
app.use('/products',productRouter);
app.use(express.urlencoded({ extended: true }));

const PORT: number = parseInt((process.env.PORT || '7000') as string, 10)

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})