export type CartItem = {
    _id: string;
    title: string;
    img: string | undefined;
    amount: number; //Any value less or equal than available amount
    quantity: number; //Available amount before completing an order
    price: number;    
}

export type Cart = {
    cartItems: CartItem[]; 
    totalPrice: number
}