import HandledError from "./handled-error";

export default class ForbiddenError extends HandledError {
    constructor(message: string, key?: string) {
        super({ [key ?? "_"]: message }, 403)
    }
}