import { Schema, Types, model } from "mongoose"

export enum CountryCode {
    usa = "USA",
    canada = "CAN",
    uk = "GBR",
    france = "FRA",
    germany = "DEU",
    ireland = "IRL",
    denmark = "DNK",
    india = "IND",
    japan = "JPN",
    china = "CHN",
    south_korea = "KOR",

}

export function allCountryCodes() {
    return [
        CountryCode.usa,
        CountryCode.canada,
        CountryCode.uk,
        CountryCode.france,
        CountryCode.germany,
        CountryCode.ireland,
        CountryCode.denmark,
        CountryCode.india,
        CountryCode.japan,
        CountryCode.china,
        CountryCode.south_korea
    ]
}

export interface IAddress {
    // _id?: Types.ObjectId
    // userId: Types.ObjectId
    default: boolean
    premise: string             // Apartment, Suite, Box number, etc.
    thoroughfare: string        // Street address
    locality: string            // City / Town
    administrativeArea: string  // State / Province / Region (ISO code when available)
    postalCode: string
    country: CountryCode        // Country (always required, 2 character ISO code)
}

const addressSchema = new Schema<IAddress>({
    // userId: {
    //     type: Schema.Types.ObjectId, 
    //     ref: 'User',
    //     required: true
    // },
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
        enum: allCountryCodes(),
        default: CountryCode.india
    },
})

// const Address = model<IAddress>("Address", schema)
// export default Address

export default addressSchema