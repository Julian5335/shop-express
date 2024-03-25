import { ObjectId, Schema, model } from "mongoose";

export interface IProduct {
    _id?: ObjectId,
    categoryId: ObjectId,
    name: string,
    price: number,
    discounts: {
        flat: number,
        percent: number
    },
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
    discounts: {
        flat: {
            type: Number,
            min: 0,
            default: 0
        },
        percent: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        }
    },
    available: {
        type: Boolean,
        default: false
    }
})

const Product = model<IProduct>('Product', schema)
export default Product