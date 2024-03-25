import { BadRequestError, HandledError } from "../app.errors";

export class CannotFindByIdError extends BadRequestError {
    constructor() {
        super('Not found', '_id')
    }
}

export class DeletionError extends HandledError {
    constructor(acknowledged: boolean, deletedCount: number) {
        const errors: { [key: string]: string } = {}
        if (!acknowledged) {
            errors['deletion'] = 'Not acknowledged'
        }
        if (deletedCount != 1) {
            errors['deletionCount'] = `Number of items deleted: ${deletedCount}`
        }
        super(errors, 500)
    }
}