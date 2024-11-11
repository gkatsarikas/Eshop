export type CartItem = {
    _id: string;
    title: string;
    img: string | undefined;
    amount: number;
    quantity: number;
    price: number;
  };
  

export type Cart = {
    cartItems: CartItem[]; 
    totalPrice: number
}