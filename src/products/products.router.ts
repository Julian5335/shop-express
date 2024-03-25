import { NextFunction, Request, Response, Router } from "express";
import { GetProductsRequest } from "./products.requests";

import ProductService, { IProductService } from "./products.service";
import ProductRepository, { IProductRepository } from "./products.repository";

const repository: IProductRepository = new ProductRepository()
const service: IProductService = new ProductService(repository)

const productRouter = Router()

productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: GetProductsRequest = req.body
        const products = await service.getAll(body)
        return res.status(200).json(products)
    } catch (e) {
        next(e)
    }
})

export default productRouter