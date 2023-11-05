import { Schema, Types, model } from "mongoose";
import { Role } from "../enums/role";

export interface IUser {
    _id: Types.ObjectId
    email: string
    name: string
    password?: string
    roles?: Role[]
}

const schema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [ String ],
        default: [ Role.USER ]
    }
})

const User = model<IUser>("User", schema)
export default User