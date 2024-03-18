import User, { IUser } from "./auth.models";

export interface IUserRepository {
    findByEmail(email: String): Promise<IUser | null>;
    save(user: IUser): Promise<IUser>
}

export default class UserRepository implements IUserRepository {

    async findByEmail(email: String): Promise<IUser | null> {
        return User.findOne({ email })
    }

    async save(user: IUser): Promise<IUser> {
        const userDocument = new User(user)
        return userDocument.save()
    }
}