import { Types } from "mongoose";
import Address, { IAddress } from "./address";
import { DefaultAddressNotSetError } from "./address.errors";
import { AddressRepository, IAddressRepository } from "./address.repository";
import { AddressNotFoundError } from "./address.exceptions";
import { updateAddressFromRequest } from "./address.requests";

const repository: IAddressRepository = new AddressRepository(Address)

export async function getAddresses(user_id: Types.ObjectId) {
    return await repository.findByUserId(user_id)
}

export async function getDefaultAddress(user_id: Types.ObjectId) {
    const address = await repository.findByUserIdAndIsDefaultTrue(user_id)
    if (!address) throw new DefaultAddressNotSetError()
    return address
}

export async function addAddress(user_id: Types.ObjectId, req: IAddress) {
    req.user_id = user_id
    return await repository.save(req)
}

export async function updateAddress(user_id: Types.ObjectId, id: Types.ObjectId, req: IAddress) {
    const address = await findByIdAndUserId(id, user_id)
    if (req.default) {
        const currentDefaultAddress = await getDefaultAddress(user_id).catch((e: DefaultAddressNotSetError) => undefined)
        if (currentDefaultAddress) {
            currentDefaultAddress.default = false
            await repository.save(currentDefaultAddress)
        }
    }
    updateAddressFromRequest(address, req)
    return await repository.save(address)
}

export async function deleteAddressByUserIdAndId(user_id: Types.ObjectId, id: Types.ObjectId) {
    const address = await findByIdAndUserId(id, user_id)
    await repository.deleteById(address._id!)
}

async function findByIdAndUserId(id: Types.ObjectId, user_id: Types.ObjectId): Promise<IAddress> {
    const address = await repository.findByIdAndUserId(id, user_id)
    if (!address) throw new AddressNotFoundError()
    return address
}