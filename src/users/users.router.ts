import { NextFunction, Request, Response, Router } from "express";
import { getUserFromResponse } from "../authentication/auth.principal";

const userRouter = Router()

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFromResponse(res)
        return res.status(200).json(user)
    } catch (e) {
       next(e) 
    }
})

export default userRouter