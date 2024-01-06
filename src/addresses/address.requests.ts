import { checkSchema } from "express-validator"
import { CountryCode, allCountryCodes } from "./countries"

export interface AddressRequest {
    default: boolean
    premise: string
    thoroughfare: string
    locality: string
    administrativeArea: string
    postalCode: string
    country: CountryCode     
}

const isLength = (max: number) => {
    return {
        options: { max },
        errorMessage: 'Cannot exceed 20 characters'
    }
}

export const addressSchema = checkSchema({
    default: {
        isBoolean: true,
        errorMessage: 'Should be true or false',
    },
    premise: {
        notEmpty: true,
        isLength: isLength(20),
        errorMessage: 'Please enter a value'
    },
    thoroughfare: {
        notEmpty: true,
        isLength: isLength(20),
        errorMessage: 'Please enter a value'
    },
    locality: {
        notEmpty: true,
        isLength: isLength(20),
        errorMessage: 'Please enter a value'
    },
    administrativeArea: {
        notEmpty: true,
        isLength: isLength(20),
        errorMessage: 'Please enter a value'
    },
    postalCode: {
        notEmpty: true,
        isLength: isLength(20),
        errorMessage: 'Please enter a value'
    },
    country: {
        notEmpty: true,
        isIn: {
            options: [allCountryCodes()],
            errorMessage: 'Please enter a valid country'
        },
        errorMessage: 'Please enter a value.'
    }
})