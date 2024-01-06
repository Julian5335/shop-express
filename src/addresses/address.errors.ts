import BadRequestError from "../core/errors/bad-request-error";

export class DefaultAddressNotSetError extends BadRequestError {
    constructor() {
        super("Default address is not set")
    }
}

export class UserAddressNotFoundByIdError extends BadRequestError {
    constructor() {
        super("Address does not exist", "_id")
    }
}