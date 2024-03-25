import { Model, ObjectId } from "mongoose"
import { CannotFindByIdError, DeletionError } from "./repository.errors"

export type Identifiable = { _id?: ObjectId }

export interface IRepository<T> {
    save(t: T): Promise<T>
    findAll(): Promise<T[]>
    findById(id: ObjectId): Promise<T>
    deleteById(id: ObjectId): Promise<void>
}

export default class Repository<T extends Identifiable> implements IRepository<T> {

    model: Model<T>

    constructor(model: Model<T>) {
        this.model = model
    }

    async save(t: T): Promise<T> {
        const doc = new this.model(t)
        return await doc.save()
    }

    async findAll(): Promise<T[]> {
        return await this.model.find()
    }

    async findById(id: ObjectId): Promise<T> {
        const t = await this.model.findOne({ _id: id })
        if (!t) throw new CannotFindByIdError()
        return t
    }

    async deleteById(id: ObjectId): Promise<void> {
        const result = await this.model.deleteOne({ _id: id })
        const { acknowledged, deletedCount } = result
        if (!acknowledged || deletedCount != 1) {
            throw new DeletionError(acknowledged, deletedCount)
        }
    }

}