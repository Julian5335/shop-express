import { Schema, Types, model } from "mongoose"
import addressSchema, { IAddress } from "./addresses/addresses.schema"
import { Role } from "./users.enums"

export interface IUser {
    _id?: Types.ObjectId
    email: string
    name: string
    dateOfBirth: number
    password?: string
    roles?: Role[]
    addresses: IAddress[]
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
        default: [ Role.user ]
    },
    addresses: {
        type: [ addressSchema ],
        default: []
    }
})

const User = model<IUser>("User", schema)
export default User