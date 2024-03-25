import { ObjectId } from "mongoose";
import Category, { ICategory } from "./categories.model";
import { ICategoryRepository } from "./categories.repository";
import { CategoryRequest } from "./categories.requests";

export interface ICategoryService {
    getAll(): Promise<ICategory[]>
    add(req: CategoryRequest): Promise<ICategory>
    update(id: ObjectId, request: CategoryRequest): Promise<ICategory>
    deleteById(id: ObjectId): Promise<void>
}

export default class CategoryService implements ICategoryService {

    repository: ICategoryRepository<ICategory>

    constructor(repository: ICategoryRepository<ICategory>) {
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
        // TODO: Do not delete if it is referenced by products
        return await this.repository.deleteById(id)
    }

}