import { ObjectId, Schema } from "mongoose"
import { CountryCode, countryCodes } from "../users.enums"

export interface IAddress {
    _id?: ObjectId
    default: boolean
    premise: string             // Apartment, Suite, Box number, etc.
    thoroughfare: string        // Street address
    locality: string            // City / Town
    administrativeArea: string  // State / Province / Region (ISO code when available)
    postalCode: string
    country: CountryCode        // Country (always required, 2 character ISO code)
}

const addressSchema = new Schema<IAddress>({
    default: {
        type: Boolean, 
        default: false
    },
    premise: {
        type: String,
        required: true,
    },
    thoroughfare: {
        type: String,
        required: true,
    },
    locality: {
        type: String,
        required: true
    },
    administrativeArea: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        enum: countryCodes,
        default: CountryCode.india
    },
})

export default addressSchema