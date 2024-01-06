import { Types } from "mongoose";
import Repository, { IRepository } from "../core/repository/repository";
import { IAddress } from "./address";

export interface IAddressRepository extends IRepository<IAddress> {
    findByUserId(userId: Types.ObjectId): Promise<IAddress[]>;
    findByUserIdAndIsDefaultTrue(userId: Types.ObjectId): Promise<IAddress | null>
    findByIdAndUserId(_id: Types.ObjectId, userId: Types.ObjectId): Promise<IAddress | null>
}

export class AddressRepository extends Repository<IAddress> implements IAddressRepository {

    async findByUserId(userId: Types.ObjectId): Promise<IAddress[]> {
        return await this.M.find({ userId })
    }

    async findByUserIdAndIsDefaultTrue(userId: Types.ObjectId): Promise<IAddress | null> {
        return await this.M.findOne({ userId, default: true })
    }

    async findByIdAndUserId(_id: Types.ObjectId, userId: Types.ObjectId): Promise<IAddress | null> {
        return await this.M.findOne({ _id, userId })
    }

}