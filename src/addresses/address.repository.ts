import { Types } from "mongoose";
import Repository, { IRepository } from "../core/repository/repository";
import { IAddress } from "./address";

export interface IAddressRepository extends IRepository<IAddress> {
    findByUserId(user_id: Types.ObjectId): Promise<IAddress[]>;
    findByUserIdAndIsDefaultTrue(user_id: Types.ObjectId): Promise<IAddress | null>
    findByIdAndUserId(_id: Types.ObjectId, user_id: Types.ObjectId): Promise<IAddress | null>
}

export class AddressRepository extends Repository<IAddress> implements IAddressRepository {

    async findByUserId(user_id: Types.ObjectId): Promise<IAddress[]> {
        return await this.M.find({ user_id })
    }

    async findByUserIdAndIsDefaultTrue(user_id: Types.ObjectId): Promise<IAddress | null> {
        return await this.M.findOne({ user_id, is_default: true })
    }

    async findByIdAndUserId(_id: Types.ObjectId, user_id: Types.ObjectId): Promise<IAddress | null> {
        return await this.M.findOne({ _id, user_id })
    }

}