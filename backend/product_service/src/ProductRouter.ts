import express, {Response, Request} from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from './ProductModel'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

export const productRouter = express.Router()

const dir = path.join(__dirname, 'uploads', 'images');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

//Handle images
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/images')
    },
    filename: function (req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    },
})
const upload = multer({ storage });



//GET all products 
productRouter.get(
    '/',
    asyncHandler(async (req : Request, res : Response) => {
        const products = await ProductModel.find();
        res.json(products);
    })
);

//GET a product based on its id
productRouter.get(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const product = await ProductModel.findById(req.params.id);

        if(product){
            res.json(product);
        }
        
        else{
            res.status(404).json({message: "Product not found"});
        }
    })
);

//GET a product based on its title
productRouter.get(
    '/title/:title',
    asyncHandler(async (req: Request, res: Response) => {
        const product = await ProductModel.findOne({title: req.params.title});

        if(product){
            res.json(product);
        }
        
        else{
            res.status(404).json({message: "Product not found"});
        }
    })
);


//POST new product
productRouter.post(
    '/',
    upload.single('img'), // This will handle a single image upload under the field 'img'
    asyncHandler(async (req: Request, res: Response) => {
        const { title, price, quantity } = req.body;

        if (!title) {
            res.status(400).json({ message: "Title is required" });
            return;
        } else if (!price) {
            res.status(400).json({ message: "Price is required" });
            return;
        } else if (!quantity || quantity <= 0) {
            res.status(400).json({ message: "Quantity must be greater than 0" });
            return;
        }

        const img = req.file ? `/uploads/images/${req.file.filename}` : null; // Store the image path

        const product = new ProductModel({
            title,
            img,  
            price,
            quantity,
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct);  
    })
);

//PUT update product by id
productRouter.put(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params
        const { title, img, price, quantity } = req.body;

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            {title,img,price,quantity},
            {new: true, runValidators: true}
        );

        if(!updatedProduct){
            res.status(404).json({message: "Product not found"});
        }

        else{
            res.json(updatedProduct);
            res.status(201).json({message: "Product updated successfully"});
        }
    })
);

//DELETE a product by id
productRouter.delete(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params

        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        if(!deletedProduct){
            res.status(404).json({message: "Product not found"});
        }

        else{
            res.status(201).json({message: "Product deleted successfully"});
        }
    })
);