import { Request } from "express";
import { validationResult } from 'express-validator';
import { ExpressValidationError } from "./app.errors";

const validate = (req: Request) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const errors = result.array()
        throw new ExpressValidationError(errors)
    }
}

export default validate