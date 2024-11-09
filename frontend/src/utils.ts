import { CartItem } from "./types/Cart";
import { ApiError} from "./types/Error";
import { Product } from "./types/Product";

export const getError = (error: ApiError) => {
    return error.response && error.response.data.message ? error.response.data.message : error.message;
}

export const toCartItem = (product: Product): CartItem => {
    const cartItem: CartItem = {
        _id: product._id,
        title: product.title,
        img: product.img,
        price: product.price,
        quantity: product.quantity,
        amount: 1,
    }

    return cartItem
}