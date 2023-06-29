import { Request } from "express";
import { validationResult } from 'express-validator';
import ExpressValidationError from "./express-validation-error";

const validate = (req: Request) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const errors = result.array()
        throw new ExpressValidationError(errors)
    }
}

export default validate