import { NextFunction, Request, Response, Router } from "express";
import { ICategory } from "./categories.model";
import CategoryRepository, { ICategoryRepository } from "./categories.repository";
import { CategoryRequest } from "./categories.requests";
import CategoryService, { ICategoryService } from "./category.service";

const repository: ICategoryRepository<ICategory> = new CategoryRepository()
const service: ICategoryService = new CategoryService(repository)

const adminCategoryRouter = Router()

adminCategoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await service.getAll()
        return res.status(200).json(categories)
    } catch (e) {
        next(e)
    }
})

adminCategoryRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryRequest = req.body as CategoryRequest
        const category = await service.add(categoryRequest)
        return res.status(201).json(category)
    } catch (e) {
        next(e)
    }
})

adminCategoryRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
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