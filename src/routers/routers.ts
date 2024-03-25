import { Request, Response, Router } from "express"
import authRouter from "../authentication/auth.routers"
import { AppRouters } from "./routers.types"
import userRouters from "./user.routers"
import adminRouters from "./admin.routers"

const healthRouter = Router()
healthRouter.get('/', async (req: Request, res: Response) => {
    return res.status(200).json({
        status: 'OK'
    })
})

const routers: AppRouters = [
    {
        path: '/api/health', 
        router: healthRouter
    },
    {
        path: '/api/auth', 
        router: authRouter
    },
    ...userRouters,
    ...adminRouters
]

export default routers