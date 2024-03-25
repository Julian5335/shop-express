import { ObjectId } from "mongoose";
import Repository, { IRepository } from "../database/repository";
import User, { IUser } from "./users.model";

export interface IUserRepository<IUser> extends IRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>
    findIdByEmail(email: string): Promise<{ _id: ObjectId } | null>;
}

export default class UserRepository extends Repository<IUser> implements IUserRepository<IUser> {

    constructor() {
        super(User)
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email })
    }

    async findIdByEmail(email: string): Promise<{ _id: ObjectId }> {
        return await User.findOne({ email }).select('_id')
    }

}