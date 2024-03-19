import { checkSchema } from "express-validator";

export const loginSchema = checkSchema({
    email: {
        isEmail: true,
        errorMessage: 'Invalid email',
    },
    password: {
        isLength: {
            options: { min: 5 },
            errorMessage: 'Password should be at least 5 chars',
        },
    }
})

export const registerSchema = checkSchema({
    email: {
        isEmail: true,
        errorMessage: 'Invalid email',
    },
    name: {
        isLength: {
            options: { min: 3 },
            errorMessage: 'Password should be at least 3 chars',
        },
    },
    password: {
        isLength: {
            options: { min: 5 },
            errorMessage: 'Password should be at least 5 chars',
        },
    },
    dateOfBirth: {
        isInt: {
            options: {
                min: 0,
                max: Date.now() + 3_153_600_000_000 // 100 years
            },
            errorMessage: 'Age should be between 13 and 100'
        }
    }
})