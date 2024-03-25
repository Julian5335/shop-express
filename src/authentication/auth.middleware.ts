import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../app.errors";
import { Role } from "../users/users.enums";
import UserRepository, { IUserRepository } from "../users/users.repository";
import TokenService, { ITokenService } from "./token.service";

const userRepository: IUserRepository = new UserRepository()
const tokenService: ITokenService = new TokenService(userRepository)

async function handleAuthForRole(req: Request, res: Response, next: NextFunction, role: Role) {
    try {
        const token = req.headers.authorization?.substring(7)!
        if (!token) throw new ForbiddenError('Not logged in', 'token')
        const userId = await tokenService.validateJwt(token, role)!
        res.locals.principle = userId
        next()
    } catch (e) {
        if (e instanceof ForbiddenError) {
            return next(e)
        }
        next(new ForbiddenError('Unable to authenticate'))
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await handleAuthForRole(req, res, next, Role.user)
}

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await handleAuthForRole(req, res, next, Role.admin)
}