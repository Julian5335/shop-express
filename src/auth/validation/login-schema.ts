import { checkSchema } from "express-validator";

const loginSchema = checkSchema({
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

export default loginSchema