import { NextFunction, Request, Response, Router } from "express";
import validate from "../../app.validations";
import { getUserFromResponse } from "../../authentication/auth.user";
import UserRepository, { IUserRepository } from "../users.repository";
import UserService, { IUserService } from "../users.service";
import { IAddress } from "./addresses.schema";
import { addressSchema } from "./addresses.validation";

const userRepository: IUserRepository = new UserRepository()
const userService: IUserService = new UserService(userRepository)

const addressRouter = Router()

addressRouter.post('/', ...addressSchema, async (req: Request, res: Response, next: NextFunction) => {
    try {
        validate(req)
        const address: IAddress = req.body
        const user = await getUserFromResponse(res)
        const response = await userService.addAddress(user, address)
        return res.status(201).json(response)
    } catch (e) {
        next(e)
    }
})

export default addressRouter