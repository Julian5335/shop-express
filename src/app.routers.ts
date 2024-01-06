import addressRouter from "./addresses/address.router"
import authRouter from "./auth/routers/auth"
import healthRouter from "./core/health/health"
import userProfileRouter from "./user.profile/user.profile.router"

const routers = [
    {
        path: '/api/health', 
        router: healthRouter
    },
    {
        path: '/api/auth', 
        router: authRouter
    },
    {
        path: '/api/users/profile', 
        router: userProfileRouter
    },
    {
        path: '/api/users/addresses', 
        router: addressRouter
    }
]

export default routers