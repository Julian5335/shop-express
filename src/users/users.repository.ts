import { ObjectId } from "mongoose";
import Repository, { IRepository } from "../database/repository";
import User, { IUser } from "./users.model";

export interface IUserRepository extends IRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>
    findIdByEmail(email: string): Promise<{ _id: ObjectId } | null>;
}

export default class UserRepository extends Repository<IUser> implements IUserRepository {

    constructor() {
        super(User)
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({ email })
    }

    async findIdByEmail(email: string): Promise<{ _id: ObjectId }> {
        return await this.model.findOne({ email }).select('_id')
    }

}