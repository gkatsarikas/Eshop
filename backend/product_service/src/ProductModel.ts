import {prop, getModelForClass } from "@typegoose/typegoose";


export class Product{
    public _id!: string

    @prop({ required: true})
    public title!: string

    @prop({ required: false})
    public img?: string
    
    @prop({ required: true})
    public price!: number

    @prop({ required: true})
    public quantity!: number

}

export const ProductModel = getModelForClass(Product)