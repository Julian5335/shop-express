import { ObjectId } from "mongoose";
import { IProduct } from "./products.model";
import { IProductRepository } from "./products.repository";
import { AddProductRequest, GetProductsRequest, UpdateProductRequest } from "./products.requests";

export interface IAdminProductService {
    getAll(request: GetProductsRequest): Promise<IProduct[]>
    add(request: AddProductRequest): Promise<IProduct>
    update(id: ObjectId, request: UpdateProductRequest): Promise<IProduct>
    delete(id: ObjectId): Promise<void>
}

export default class AdminProductService implements IAdminProductService {

    private repository: IProductRepository

    constructor(repository: IProductRepository) {
        this.repository = repository
    }

    async getAll(request: GetProductsRequest) {
        const { filter } = request
        if (!filter) {
            return await this.repository.findAll()
        }
        return await this.repository.findAllFiltered(filter)
    }

    async add(request: AddProductRequest) {
        const product: IProduct = {
            ...request,
            available: true
        }
        return await this.repository.save(product)
    }

    async update(id: ObjectId, request: UpdateProductRequest) {
        const product = await this.repository.findById(id)
        product.name = request.name
        product.categoryId = request.categoryId
        product.price = request.price
        product.available = request.available
        return await this.repository.save(product)
    }

    async delete(id: ObjectId) {
        return await this.repository.deleteById(id)
    }

}