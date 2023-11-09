import BadRequestError from "../core/errors/bad-request-error";

export class AddressNotFoundError extends BadRequestError {
    constructor() {
        super("Address does not exist")
    }
}