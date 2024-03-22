import { checkSchema } from "express-validator";
import { countryCodes } from "../users.enums";

export const addressSchema = checkSchema({
    default: {
        isBoolean: true,
        default: false,
        errorMessage: 'Value should be true or false',
    },
    premise: {
        notEmpty: true,
        errorMessage: 'Cannot be empty',
    },
    thoroughfare: {
        notEmpty: true,
        errorMessage: 'Cannot be empty'
    },
    locality: {
        notEmpty: true,
        errorMessage: 'Cannot be empty'
    },
    administrativeArea: {
        notEmpty: true,
        errorMessage: 'Cannot be empty'
    },
    postalCode: {
        notEmpty: true,
        errorMessage: 'Cannot be empty'
    },
    country: {
        isIn: {
            options: [ countryCodes ],
            errorMessage: 'Cannot be empty'
        }
    }
})