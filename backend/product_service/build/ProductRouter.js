"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ProductModel_1 = require("./ProductModel");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.productRouter = express_1.default.Router();
const dir = path_1.default.join(__dirname, 'uploads', 'images');
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir, { recursive: true });
}
//Handle images
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
//GET all products 
exports.productRouter.get('/', (0, express_async_handler_1.default)(async (req, res) => {
    const products = await ProductModel_1.ProductModel.find();
    res.json(products);
}));
//GET a product based on its id
exports.productRouter.get('/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const product = await ProductModel_1.ProductModel.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: "Product not found" });
    }
}));
//GET a product based on its title
exports.productRouter.get('/title/:title', (0, express_async_handler_1.default)(async (req, res) => {
    const product = await ProductModel_1.ProductModel.findOne({ title: req.params.title });
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: "Product not found" });
    }
}));
//POST new product
exports.productRouter.post('/', upload.single('img'), // This will handle a single image upload under the field 'img'
(0, express_async_handler_1.default)(async (req, res) => {
    const { title, price, quantity } = req.body;
    if (!title) {
        res.status(400).json({ message: "Title is required" });
        return;
    }
    else if (!price) {
        res.status(400).json({ message: "Price is required" });
        return;
    }
    else if (!quantity || quantity <= 0) {
        res.status(400).json({ message: "Quantity must be greater than 0" });
        return;
    }
    const img = req.file ? `/uploads/images/${req.file.filename}` : null; // Store the image path
    const product = new ProductModel_1.ProductModel({
        title,
        img,
        price,
        quantity,
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
}));
//PUT update product by id
exports.productRouter.put('/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { title, img, price, quantity } = req.body;
    const updatedProduct = await ProductModel_1.ProductModel.findByIdAndUpdate(id, { title, img, price, quantity }, { new: true, runValidators: true });
    if (!updatedProduct) {
        res.status(404).json({ message: "Product not found" });
    }
    else {
        res.json(updatedProduct);
        res.status(201).json({ message: "Product updated successfully" });
    }
}));
//DELETE a product by id
exports.productRouter.delete('/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await ProductModel_1.ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
        res.status(404).json({ message: "Product not found" });
    }
    else {
        res.status(201).json({ message: "Product deleted successfully" });
    }
}));
