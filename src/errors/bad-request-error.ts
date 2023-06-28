import HandledError from "./handled-error";

export default class BadRequestError extends HandledError {
    constructor(message: string, key?: string) {
        super({ [key ?? "_"]: message }, 400)
    }
}