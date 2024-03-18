import { NextFunction, Request, Response } from "express"
import { FieldValidationError, ValidationError } from "express-validator"

export class HandledError extends Error {

    status = 500
    errors: { [key: string]: string }

    constructor(errors: { [key: string]: string }, status?: number) {
        super("handled error")
        this.errors = errors
        if (status) this.status = status
    }

}

export class BadRequestError extends HandledError {
    constructor(message: string, key?: string) {
        super({ [key ?? "_"]: message }, 400)
    }
}

export class ForbiddenError extends HandledError {
    constructor(message: string, key?: string) {
        super({ [key ?? "_"]: message }, 403)
    }
}

export class ExpressValidationError extends HandledError {
    constructor(validationErrors: ValidationError[]) {
        const fieldValidationErrors = validationErrors as FieldValidationError[]
        const errors: { [key: string]: string } = {}
        fieldValidationErrors.forEach(x => {
            errors[`${x.path}`] = x.msg
        })
        super(errors, 400)
    }
}

const errorHandler = (e: Error, req: Request, res: Response, next: NextFunction) => {
    if (e instanceof HandledError) {
        return res.status(e.status).json({ errors : e.errors })
    }
    return res.status(500).json({ errors: { _: "Internal server error" } })
}

export default errorHandler;