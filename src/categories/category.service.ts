import { ICategory } from "./categories.model";
import { ICategoryRepository } from "./categories.repository";

export interface ICategoryService {
    getAll(): Promise<ICategory[]>
}

export default class CategoryService implements ICategoryService {

    repository: ICategoryRepository

    constructor(repository: ICategoryRepository) {
        this.repository = repository
    }

    async getAll() {
        return await this.repository.findAll()
    }

}