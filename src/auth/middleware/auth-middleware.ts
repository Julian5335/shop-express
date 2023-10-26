import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../../errors/forbidden-error";
import { Role } from "../enums/role";
import { validateJwt } from "../services/token-service";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.substring(7)!
        if (!token) throw new ForbiddenError('Token is mising', 'token')
        const user = await validateJwt(token, Role.USER)!
        res.locals.principle = user
        next()
    } catch (e) {
        next(e)
    }
}

export default authMiddleware