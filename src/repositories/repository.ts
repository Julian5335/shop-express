import { Document, IfAny, Model, Require_id, Types } from "mongoose";
import CannotFindByIdError from "./errors/cannot-find-by-id";

export type Entity<T> = IfAny<T, any, Document<unknown, {}, T> & Omit<Require_id<T>, never>>

export interface IRepository<T> {
    save(t: T): Promise<Entity<T>>
}

export default class Repository<T> implements IRepository<T> {

    M: Model<T>

    constructor(model: Model<T>) {
        this.M = model
    }

    async save(t: T): Promise<Entity<T>> {
        const m = new this.M(t)
        await m.save()
        return m
    }

    async findById(_id: Types.ObjectId) {
        const entity: Entity<T> | null = await this.M.findById(_id)
        if (!entity) {
            const entityName: string = this.M.name
            throw new CannotFindByIdError(entityName)
        }
        return entity
    }

    findAll(): Promise<Entity<T>[]> {
        return this.M.find()
    }

    async update(_id: Types.ObjectId, params: any): Promise<Entity<T>> {
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