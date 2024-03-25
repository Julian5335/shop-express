import adminCategoryRouter from "../categories/categories.admin.router"
import { AppRouters } from "./routers.types"

export const adminsPath = '/api/admins'

const adminRouters: AppRouters = [
    {
        path: '/categories',
        router: adminCategoryRouter
    }
].map(x => {
    return {
        path: `${adminsPath}${x.path}`,
        router: x.router
    }
})

export default adminRouters