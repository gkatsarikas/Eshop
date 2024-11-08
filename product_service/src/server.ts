import dotenv from 'dotenv'
import express, {Request,Response} from 'express'
import mongoose, { mongo } from 'mongoose'
import { productRouter } from './ProductRouter'
import cors from 'cors'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/productsDB'

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
    origin: 'http://localhost:5173'
    }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/products',productRouter);


const PORT: number = parseInt((process.env.PORT || '7000') as string, 10)
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})