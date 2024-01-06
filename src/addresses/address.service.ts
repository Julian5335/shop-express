import { Types } from "mongoose";
import Address, { IAddress } from "./address";
import { DefaultAddressNotSetError, UserAddressNotFoundByIdError } from "./address.errors";
import { AddressRepository, IAddressRepository } from "./address.repository";
import { AddressRequest } from "./address.requests";

const repository: IAddressRepository = new AddressRepository(Address)

export async function getAddresses(userId: Types.ObjectId) {
    return await repository.findByUserId(userId)
}

export async function getDefaultAddress(userId: Types.ObjectId) {
    const address = await repository.findByUserIdAndIsDefaultTrue(userId)
    if (!address) throw new DefaultAddressNotSetError()
    return address
}

export async function addAddress(userId: Types.ObjectId, req: AddressRequest) {
    if (req.default) {
        await updateCurrentDefaultAddress(userId)
    }
    const address = { userId, ...req }
    return await repository.save(address)
}

export async function updateAddress(userId: Types.ObjectId, id: Types.ObjectId, req: AddressRequest) {
    const address = await findByIdAndUserId(id, userId)
    address.default = req.default
    address.premise = req.premise
    address.thoroughfare = req.thoroughfare
    address.locality = req.locality
    address.administrativeArea = req.administrativeArea
    address.postalCode = req.postalCode
    address.country = req.country
    
    if (req.default) {
        await updateCurrentDefaultAddress(userId)
    }

    return await repository.save(address)
}

export async function deleteAddressByUserIdAndId(userId: Types.ObjectId, id: Types.ObjectId) {
    const address = await findByIdAndUserId(id, userId)
    await repository.deleteById(address._id!)
}

async function findByIdAndUserId(id: Types.ObjectId, userId: Types.ObjectId): Promise<IAddress> {
    const address = await repository.findByIdAndUserId(id, userId)
    if (!address) throw new UserAddressNotFoundByIdError()
    return address
}

async function updateCurrentDefaultAddress(userId: Types.ObjectId) {
    const currentDefaultAddress = await getDefaultAddress(userId).catch((e: DefaultAddressNotSetError) => undefined)
    if (currentDefaultAddress) {
        currentDefaultAddress.default = false
        await repository.save(currentDefaultAddress)
    }
}