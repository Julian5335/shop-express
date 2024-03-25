import { checkSchema } from "express-validator";

export const categorySchema = checkSchema({
    name: {
        notEmpty: false,
        errorMessage: 'Is required',
        isLength: {
            options: {
                min: 3
            },
            errorMessage: 'Cannot be less than 3 characters'
        }
    }
})