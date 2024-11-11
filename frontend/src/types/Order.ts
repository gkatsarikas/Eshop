import { CartItem } from "./Cart"

export type Order = {
    _id: string
    orderItems: CartItem[]
    user: string
    totalPrice: number
    status: string
    date: Date
}