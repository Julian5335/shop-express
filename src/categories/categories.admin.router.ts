import { NextFunction, Request, Response, Router } from "express";
import AdminCategoryService, { IAdminCategoryService } from "./categories.admin.service";
import CategoryRepository, { ICategoryRepository } from "./categories.repository";
import { CategoryRequest } from "./categories.requests";
import { categorySchema } from "./categories.validation";
import validate from "../app.validations";

const repository: ICategoryRepository = new CategoryRepository()
const service: IAdminCategoryService = new AdminCategoryService(repository)

const adminCategoryRouter = Router()

adminCategoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await service.getAll()
        return res.status(200).json(categories)
    } catch (e) {
        next(e)
    }
})

adminCategoryRouter.post('/', ...categorySchema, async (req: Request, res: Response, next: NextFunction) => {
    try {
        validate(req)
        const categoryRequest = req.body as CategoryRequest
        const category = await service.add(categoryRequest)
        return res.status(201).json(category)
    } catch (e) {
        next(e)
    }
})

adminCategoryRouter.put('/:id', ...categorySchema, async (req: Request, res: Response, next: NextFunction) => {
    try {
        validate(req)
        const id = req.params.id as any
        const categoryRequest = req.body as CategoryRequest
        const category = await service.update(id, categoryRequest)
        return res.status(200).json(category)
    } catch (e) {
        next(e)
    }
})

adminCategoryRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as any
        await repository.deleteById(id)
        return res.status(204).json()
    } catch (e) {
        next(e)
    }
})

export default adminCategoryRouter