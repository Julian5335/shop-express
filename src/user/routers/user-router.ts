import { NextFunction, Request, Response, Router } from "express";
import { getUserFrom } from "../../core/auth/services/user-service";

const userRouter = Router()

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFrom(res)
        
        // Not exposing the users password
        user.password = undefined

        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})

export default userRouter