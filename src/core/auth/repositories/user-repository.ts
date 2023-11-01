import Repository, { IRepository } from "../../repository/repository";
import { IUser } from "../models/user";

export interface IUserRepository<IUser> extends IRepository<IUser> {
    findByEmail(email: String): Promise<IUser | null>;
}

export default class UserRepository extends Repository<IUser> implements IUserRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null> {
        return this.M.findOne({ email })
    }
}