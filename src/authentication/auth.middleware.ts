import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../app.errors";
import { Role } from "./auth.models";
import TokenService, { ITokenService } from "./token.service";

const tokenService: ITokenService = new TokenService()

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.substring(7)!
        if (!token) throw new ForbiddenError('Not logged in', 'token')
        const user = await tokenService.validateJwt(token, Role.USER)!
        res.locals.principle = user
        next()
    } catch (e) {
        next(e)
    }
}

export default authMiddleware