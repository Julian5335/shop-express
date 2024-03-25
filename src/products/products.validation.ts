import { checkSchema } from "express-validator";

export const addProductSchema = checkSchema({
    name: {
        notEmpty: true,
        errorMessage: 'Is required',
        isLength: {
            options: {
                min: 3
            },
            errorMessage: 'Must be at least 3 characters'
        }
    },
    categoryId: {
        notEmpty: true,
        errorMessage: 'Is required'
    },
    price: {
        isInt: {
            options: {
                min: 0
            },
            errorMessage: 'Cannot be less than 0'
        },
    }
})

export const updateProductSchema = checkSchema({
    name: {
        notEmpty: true,
        errorMessage: 'Is required',
        isLength: {
            options: {
                min: 3
            },
            errorMessage: 'Must be at least 3 characters'
        }
    },
    categoryId: {
        notEmpty: true,
        errorMessage: 'Is required'
    },
    price: {
        isInt: {
            options: {
                min: 0
            },
            errorMessage: 'Cannot be less than 0'
        },
    },
    available: {
        isBoolean: true,
        errorMessage: 'Must be true or false'
    }
})