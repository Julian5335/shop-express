import { NextFunction, Request, Response, Router } from "express";
import { IUser } from "./users.model";

const userRouter = Router()

userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser = res.locals.principle
        return res.status(200).json(user)
    } catch (e) {
       next(e) 
    }
})

export default userRouter