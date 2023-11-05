import Repository, { IRepository } from "../../core/repository/repository";
import { IUser } from "../models/user";

export interface IUserRepository extends IRepository<IUser> {
    findByEmail(email: String): Promise<IUser | null>;
}

export default class UserRepository extends Repository<IUser> implements IUserRepository {
    findByEmail(email: string): Promise<IUser | null> {
        return this.M.findOne({ email })
    }
}