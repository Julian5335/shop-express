import { Model, Types } from "mongoose";
import CannotFindByIdError from "./errors/cannot-find-by-id";

export interface IRepository<T> {
    findAll(): Promise<T[]>
    findById(_id: Types.ObjectId): Promise<T>
    save(t: T): Promise<T>
    update(_id: Types.ObjectId, params: any): Promise<T>
    deleteById(_id: Types.ObjectId): Promise<void>
}

export default class Repository<T> implements IRepository<T> {

    M: Model<T>

    constructor(model: Model<T>) {
        this.M = model
    }

    findAll(): Promise<T[]> {
        return this.M.find()
    }
    
    async findById(_id: Types.ObjectId): Promise<T> {
        const entity: T | null = await this.M.findById(_id)
        if (!entity) {
            throw new CannotFindByIdError(this.M.name)
        }
        return entity
    }

    async save(t: T): Promise<T> {
        const m = new this.M(t)
        await m.save()
        return m
    }

    async update(_id: Types.ObjectId, params: any): Promise<T> {
        const updatedEntity = await this.M.findOneAndUpdate({ _id }, { $set: params })
        if (!updatedEntity) {
            const entityName: string = this.M.name
            throw new CannotFindByIdError(entityName)
        }
        return updatedEntity
    }

    async deleteById(_id: Types.ObjectId): Promise<void> {
        await this.M.deleteOne({ _id })
    }

}