import { Types } from "mongoose";
import Repository, { IRepository } from "../core/repository/repository";
import { IAddress } from "./address";

export interface IAddressRepository extends IRepository<IAddress> {
    findByUserId(user_id: Types.ObjectId): Promise<IAddress[]>;
}

export class AddressRepository extends Repository<IAddress> implements IAddressRepository {
    async findByUserId(user_id: Types.ObjectId): Promise<IAddress[]> {
        return await this.M.find({ user_id })
    }
}