import { Schema, model } from "mongoose"
import { CountryCode } from "./countries"

export interface IAddress {
    // Apartment, Suite, Box number, etc.
    premise: string

    // Street address
    thoroughfare: string

    // City / Town
    locality: string

    // State / Province / Region (ISO code when available)
    administrativeArea: string

    postalCode: string

    // Country (always required, 2 character ISO code)
    country: CountryCode
}

const schema = new Schema<IAddress>({
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
        required: true
    },
})

const Address = model<IAddress>("User", schema)
export default Address