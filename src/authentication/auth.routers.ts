import { Request, Router } from "express";
import { loginSchema, registerSchema } from "./auth.validation";
import validate from "../app.validations";
import AuthService, { IAuthService } from "./auth.service";
import TokenService, { ITokenService } from "./token.service";
import { IUser } from "./auth.models";

const tokenService: ITokenService = new TokenService()
const service: IAuthService = new AuthService(tokenService)

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
        const { name, email, password } = req.body
        const user: IUser = {
            name,
            email,
            password,
            addresses: []
        }
        const addedUser = await service.addUser(user)
        return res.status(201).json(addedUser)
    } catch (e) {
        next(e)
    }
})

export default authRouter;