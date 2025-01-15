"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const OrderRouter_1 = require("./OrderRouter");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ordersDB';
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(() => {
    console.log('Could not connect to MongoDB');
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/orders', OrderRouter_1.orderRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
