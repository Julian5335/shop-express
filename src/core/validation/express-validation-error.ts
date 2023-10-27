import { ValidationError } from 'express-validator';
import HandledError from '../errors/handled-error';

type E = {
    path: string,
    msg: string
}

export default class ExpressValidationError extends HandledError {

    constructor(errors: ValidationError[]) {
        const es = errors as E[]
        const errorJson: { [key: string]: string } = {}
        es.forEach(x => {
            errorJson[`${x.path}`] = x.msg
        })
        super(errorJson, 400)
    }

}