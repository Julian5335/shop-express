import Category from "../categories/categories.model";
import Repository, { IRepository } from "../database/repository";
import Product, { IProduct } from "./products.model";
import { ProductFilter } from "./products.requests";

export interface IProductRepository extends IRepository<IProduct> {
    findAllFiltered(filter: ProductFilter): Promise<IProduct[]>
}

export default class ProductRepository extends Repository<IProduct> implements IProductRepository {

    constructor() {
        super(Product)
    }

    async findAllFiltered(filter: ProductFilter) {
        const { name, categoryName, price } = filter
        const query: {$and: any[]} = {
            $and: []
        }
        if (name) {
            const regex = new RegExp(name, 'i')
            query.$and.push({ name: { $regex: regex } })
        }
        if (categoryName) {
            const categories = await Category.find({ name: categoryName })
            if (categories.length == 0) {
                return []
            }
            query.$and.push({ "categoryId": { $in: categories.map(x => x._id) } })
        }
        if (price) {
            const { max, min } = price
            if (max || min) {
                if ((max && min) && (max < min)) {
                    return []
                }
                const priceSubQuery: { $gte?: number, $lte?: number } = {}
                if (max) {
                    priceSubQuery.$lte = max
                }
                if (min) {
                    priceSubQuery.$gte = min
                }
                query.$and.push({ price: priceSubQuery })
            }
        }
        if (query.$and.length == 0) {
            return await this.model.find()
        }
        const products = await this.model.find(query)
        return products
    }

}