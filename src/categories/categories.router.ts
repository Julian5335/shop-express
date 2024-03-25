import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import { ICategory } from "./categories.model";
import CategoryRepository, { ICategoryRepository } from "./categories.repository";
import { CategoryRequest } from "./categories.requests";
import CategoryService, { ICategoryService } from "./category.service";

const repository: ICategoryRepository<ICategory> = new CategoryRepository()
const service: ICategoryService = new CategoryService(repository)

const categoryRouter = Router()

categoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await service.getAll()
        return res.status(200).json(categories)
    } catch (e) {
        next(e)
    }
})

export default categoryRouter