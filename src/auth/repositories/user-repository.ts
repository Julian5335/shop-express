import Repository, { Entity, IRepository } from "../../repositories/repository"
import { IUser } from "../models/user";

export interface IUserRepository<IUser> extends IRepository<IUser> {
    findByEmail(email: String): Promise<Entity<IUser> | null>;
}

export default class UserRepository extends Repository<IUser> implements IUserRepository<IUser> {
    findByEmail(email: string): Promise<Entity<IUser> | null> {
        return this.M.findOne({ email })
    }
}