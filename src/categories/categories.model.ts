import { ObjectId, Schema, model } from "mongoose";

export interface ICategory {
    _id?: ObjectId,
    name: string
}

const schema = new Schema<ICategory>({
    name: {
        type: String,
        unique: true,
        required: true
    }
})

const Category = model<ICategory>('Category', schema)
export default Category