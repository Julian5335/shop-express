import { Request, Response, Router } from "express"
import authRouter from "./authentication/auth.routers"

const healthRouter = Router()
healthRouter.get('/', async (req: Request, res: Response) => {
    return res.status(200).json({
        status: 'OK'
    })
})

const routers = [
    {
        path: '/api/health', 
        router: healthRouter
    },
    {
        path: '/api/auth', 
        router: authRouter
    }
]

export default routers