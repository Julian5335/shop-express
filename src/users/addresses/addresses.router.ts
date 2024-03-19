import { NextFunction, Request, Response, Router } from "express";
import AuthService, { IAuthService } from "../../authentication/auth.service";
import TokenService, { ITokenService } from "../../authentication/token.service";
import UserRepository, { IUserRepository } from "../users.repository";
import { IAddress } from "./addresses.schema";
import UserService, { IUserService } from "../users.service";

const userRepository: IUserRepository = new UserRepository()
const tokenService: ITokenService = new TokenService(userRepository)
const authService: IAuthService = new AuthService(tokenService, userRepository)
const userService: IUserService = new UserService(userRepository)

const addressRouter = Router()

addressRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const address: IAddress = req.body
        const user = await authService.getUserFromResponse(res)
        const response = await userService.addAddress(user, address)
        return res.status(201).json(response)
    } catch (e) {
        console.log(e);
        
        next(e)
    }
})

export default addressRouter