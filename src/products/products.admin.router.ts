import { NextFunction, Request, Response, Router } from "express";
import { AddProductRequest, GetProductsRequest, UpdateProductRequest } from "./products.requests";
import ProductRepository, { IProductRepository } from "./products.repository";
import AdminProductService, { IAdminProductService } from "./products.admin.service";
import { addProductSchema, updateProductSchema } from "./products.validation";
import validate from "../app.validations";

const repository: IProductRepository = new ProductRepository()
const service: IAdminProductService = new AdminProductService(repository)

const adminProductRouter = Router()

adminProductRouter.post('/search', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: GetProductsRequest = req.body
        const products = await service.getAll(body)
        return res.status(200).json(products)
    } catch (e) {
        next(e)
    }
})

adminProductRouter.post('/', ...addProductSchema, async (req: Request, res: Response, next: NextFunction) => {
    try {
        validate(req)
        const request: AddProductRequest = req.body
        const product = await service.add(request)
        return res.status(201).json(product)
    } catch (e) {
        next(e)
    }
})

adminProductRouter.put('/:id', ...updateProductSchema, async (req: Request, res: Response, next: NextFunction) => {
    try {
        validate(req)
        const id = req.params.id as any
        const request: UpdateProductRequest = req.body
        const product = await service.update(id, request)
        return res.status(200).json(product)
    } catch (e) {
        next(e)
    }
})

adminProductRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as any
        await service.delete(id)
        return res.status(204).json({})
    } catch (e) {
        next(e)
    }
})

export default adminProductRouter