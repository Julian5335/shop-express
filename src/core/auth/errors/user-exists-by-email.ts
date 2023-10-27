import BadRequestError from "../../errors/bad-request-error";

export default class UserExistsByEmailError extends BadRequestError {
    constructor() {
        super('Email is not available', 'email')
    }
}