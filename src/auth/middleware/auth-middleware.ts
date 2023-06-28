import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../../errors/forbidden-error";
import { validateJwt } from "../services/token-service";
import { Role } from "../enums/role";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.substring(7)!
        const user = await validateJwt(token, Role.USER)!
        res.locals.principle = user
        next()
    } catch (e) {
        next(new ForbiddenError("You are not logged in"))
    }
}

export default authMiddleware