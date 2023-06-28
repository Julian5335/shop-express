import Repository, { Entity } from "../../repositories/repository"
import { IUser } from "../models/user";

export default class UserRepository extends Repository<IUser> {
    findByEmail(email: string): Promise<Entity<IUser> | null> {
        return this.M.findOne({ email })
    }
}