import { IProduct } from "./products.model";
import { IProductRepository } from "./products.repository";
import { GetProductsRequest } from "./products.requests";

export interface IProductService {
    getAll(request: GetProductsRequest): Promise<IProduct[]>
}

export default class ProductService implements IProductService {

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
}