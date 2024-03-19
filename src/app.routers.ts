import { Request, Response, Router } from "express"
import authRouter from "./authentication/auth.routers"
import userRouter from "./users/users.router"
import addressRouter from "./users/addresses/addresses.router"

type AppRouters = { path: string, router: Router }[]

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
    {
        path: '/api/users',
        router: userRouter
    },
    {
        path: '/api/users/addresses',
        router: addressRouter
    }
]

export default routers