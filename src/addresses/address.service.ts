import { Types } from "mongoose";
import Address, { IAddress } from "./address";
import { AddressRepository } from "./address.repository";

const repository = new AddressRepository(Address)

export async function get(user_id: Types.ObjectId) {
    return await repository.findByUserId(user_id)
}

export async function add(user_id: Types.ObjectId, req: IAddress) {
    req.user_id = user_id
    return await repository.save(req)
}