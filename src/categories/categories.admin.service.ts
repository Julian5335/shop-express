import { ObjectId } from "mongoose";
import { BadRequestError } from "../app.errors";
import Product from "../products/products.model";
import { ICategory } from "./categories.model";
import { ICategoryRepository } from "./categories.repository";
import { CategoryRequest } from "./categories.requests";

export interface IAdminCategoryService {
    getAll(): Promise<ICategory[]>
    add(req: CategoryRequest): Promise<ICategory>
    update(id: ObjectId, request: CategoryRequest): Promise<ICategory>
    deleteById(id: ObjectId): Promise<void>
}

export default class AdminCategoryService implements IAdminCategoryService {

    repository: ICategoryRepository

    constructor(repository: ICategoryRepository) {
        this.repository = repository
    }

    async getAll() {
        return await this.repository.findAll()
    }

    async add(req: CategoryRequest) {
        const category: ICategory = {
            name: req.name
        }
        return await this.repository.save(category)
    }

    async update(id: ObjectId, request: { name: string }) {
        const category = await this.repository.findById(id)
        category.name = request.name
        return await this.repository.save(category)
    }

    async deleteById(id: ObjectId) {
        const products = await Product.find({ categoryId: id })
        if (products.length != 0) {
            throw new BadRequestError('Category cannot be deleted since products are assigned to it', 'id')
        }
        return await this.repository.deleteById(id)
    }

}