import BadRequestError from "../../errors/bad-request-error";

export default class CannotFindByIdError extends BadRequestError {
    constructor(entityName: string) {
        super(`cannot find ${entityName} by id`, "_id")
    }
}