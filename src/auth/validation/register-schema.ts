import { checkSchema } from "express-validator";

const registerSchema = checkSchema({
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
    }
})

export default registerSchema