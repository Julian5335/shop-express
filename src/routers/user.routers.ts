import categoryRouter from "../categories/categories.router"
import addressRouter from "../users/addresses/addresses.router"
import userRouter from "../users/users.router"
import { AppRouters } from "./routers.types"

export const usersPath = '/api/users'

const userRouters: AppRouters = [
    {
        path: '/',
        router: userRouter
    },
    {
        path: '/addresses',
        router: addressRouter
    },
    {
        path: '/categories',
        router: categoryRouter
    }
].map(x => {
    return {
        path: `${usersPath}${x.path}`,
        router: x.router
    }
})

export default userRouters