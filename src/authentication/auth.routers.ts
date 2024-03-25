import { Request, Router } from "express";
import validate from "../app.validations";
import { IUser } from "../users/users.model";
import UserRepository, { IUserRepository } from "../users/users.repository";
import AuthService, { IAuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.validation";
import TokenService, { ITokenService } from "./token.service";

const userRepository: IUserRepository = new UserRepository()
const tokenService: ITokenService = new TokenService(userRepository)
const service: IAuthService = new AuthService(tokenService, userRepository)

const authRouter = Router();

authRouter.post('/login', ...loginSchema, async (req: Request, res, next) => {
    try {
        validate(req)
        const { email, password } = req.body
        const response = await service.login(email, password)
        return res.status(200).json(response)
    } catch (e) {
        next(e)
    }
})

authRouter.post('/register', ...registerSchema, async (req: Request, res, next) => {
    try {
        validate(req)
        const { name, email, password, dateOfBirth } = req.body
        const user: IUser = {
            name,
            email,
            password,
            dateOfBirth,
            addresses: []
        }
        const addedUser = await service.addUser(user)
        return res.status(201).json(addedUser)
    } catch (e) {
        next(e)
    }
})

export default authRouter;