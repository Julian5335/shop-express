import { ObjectId } from "mongoose";
import User, { IUser } from "./users.model";

export interface IUserRepository {
    save(user: IUser): Promise<IUser>
    findById(_id: ObjectId): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
    findIdByEmail(email: string): Promise<{ _id: ObjectId } | null>;
}

export default class UserRepository implements IUserRepository {

    async save(user: IUser): Promise<IUser> {
        const userDocument = new User(user)
        return userDocument.save()
    }

    async findById(_id: ObjectId): Promise<IUser | null> {
        return await User.findOne({ _id })
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email })
    }

    async findIdByEmail(email: string): Promise<{ _id: ObjectId }> {
        return await User.findOne({ email }).select('_id')
    }

}