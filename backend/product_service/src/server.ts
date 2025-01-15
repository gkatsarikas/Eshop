import dotenv from 'dotenv'
import express, {Request,Response} from 'express'
import mongoose, { mongo } from 'mongoose'
import { productRouter } from './ProductRouter'
import cors from 'cors'
import path from 'path'

dotenv.config()
const MONGODB_URI = 'mongodb://root:example@products_db:27017/products_db?authSource=admin';
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


app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/products',productRouter);



const PORT: number = parseInt((process.env.PORT || '7000') as string, 10)
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})


