import {getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product } from "./ProductModel";

class Item{
    @prop({required: true})
    public title!: string

    @prop({required: true})
    public amount!: number

    @prop({ref: Product})
    public _id?: Ref<Product>
}



export class Order{
    public _id!: string

    @prop({ type: () => [Item], required: true }) 
    public orderItems!: Item[]

    @prop({ required: true, default: 0})
    public totalPrice!: number

    @prop({ required: true, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' }) 
    public status!: string

    @prop({required: false})
    public user?: string

    @prop({required: true, })
    public date!: Date
}

export const OrderModel = getModelForClass(Order)