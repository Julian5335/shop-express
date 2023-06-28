import { NextFunction, Request, Response } from "express";
import HandledError from "./handled-error";

const errorHandler = (e: Error, req: Request, res: Response, next: NextFunction) => {
    if (e instanceof HandledError) {
        return res.status(e.status).json({ errors : e.errors })
    }
    console.log(e.name, e.stack);
    return res.status(500).json({ errors: { _: "Internal server error" } })
}

export default errorHandler;