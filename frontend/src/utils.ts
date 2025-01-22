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


export const decodeJwt = (token: string): Record<string, any> | null => {
    try {
        const base64Url = token.split('.')[1]; // Get the payload part of the JWT
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe chars
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
        );
        return JSON.parse(jsonPayload); // Parse the JSON payload
    } catch (e) {
        console.error('Invalid JWT', e);
        return null;
    }
};