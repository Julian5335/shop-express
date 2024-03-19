import { BadRequestError } from "../app.errors";

export class LoginError extends BadRequestError {
    constructor() {
        super('Invalid Credentials')
    }
}

export class UserExistsByEmailError extends BadRequestError {
    constructor() {
        super('Email is not available', 'email')
    }
}

export class UserDoesntExistError extends BadRequestError {
    constructor() {
        super('Unable to find user by id', 'token')
    }
}