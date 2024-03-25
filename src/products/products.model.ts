import { ObjectId, Schema, model } from "mongoose";

export interface IProduct {
    _id?: ObjectId,
    categoryId: ObjectId,
    name: string,
    price: number,
    available: boolean
}

const schema = new Schema<IProduct>({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    available: {
        type: Boolean,
        default: false
    }
})

const Product = model<IProduct>('Product', schema)
export default Product