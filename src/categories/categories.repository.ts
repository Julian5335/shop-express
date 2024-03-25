import Repository, { IRepository } from "../database/repository";
import Category, { ICategory } from "./categories.model";

export interface ICategoryRepository extends IRepository<ICategory> { }

export default class CategoryRepository extends Repository<ICategory> implements ICategoryRepository {
    
    constructor() { 
        super(Category) 
    }

}