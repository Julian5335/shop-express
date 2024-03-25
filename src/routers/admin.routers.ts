import adminCategoryRouter from "../categories/categories.admin.router"
import adminProductRouter from "../products/products.admin.router"
import { AppRouters } from "./routers.types"

export const adminsPath = '/api/admins'

const adminRouters: AppRouters = [
    {
        path: '/categories',
        router: adminCategoryRouter
    },
    {
        path: '/products',
        router: adminProductRouter
    }
].map(x => {
    return {
        path: `${adminsPath}${x.path}`,
        router: x.router
    }
})

export default adminRouters