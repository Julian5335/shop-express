import BadRequestError from "../../errors/bad-request-error";

export default class LoginError extends BadRequestError {
    constructor() {
        super('Invalid Credentials')
    }
}