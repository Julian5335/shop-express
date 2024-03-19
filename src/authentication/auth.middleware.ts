import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../app.errors";
import { Role } from "../users/users.enums";
import UserRepository, { IUserRepository } from "../users/users.repository";
import TokenService, { ITokenService } from "./token.service";

const userRepository: IUserRepository = new UserRepository()
const tokenService: ITokenService = new TokenService(userRepository)

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.substring(7)!
        if (!token) throw new ForbiddenError('Not logged in', 'token')
        const userId = await tokenService.validateJwt(token, Role.user)!
        res.locals.principle = userId
        next()
    } catch (e) {
        next(e)
    }
}

export default authMiddleware