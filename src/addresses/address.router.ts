import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";
import { getUserFrom } from "../user.profile/user.profile.service";
import { AddressRequest, addressSchema } from "./address.requests";
import { addAddress, deleteAddressByUserIdAndId, getAddresses, getDefaultAddress, updateAddress } from "./address.service";

const addressRouter = Router()

addressRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFrom(res);
        const addresses = await getAddresses(user._id)
        return res.status(200).json(addresses)
    } catch (e) {
        next(e)
    }
})

addressRouter.get('/default', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFrom(res);
        const address = await getDefaultAddress(user._id)
        return res.status(200).json(address)
    } catch (e) {
        next(e)
    }
})

addressRouter.post('/', ...addressSchema, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFrom(res)
        const addressRequest: AddressRequest = req.body
        const addedAddress = await addAddress(user._id, addressRequest)
        return res.status(201).json(addedAddress)
    } catch (e) {
        next(e)
    }
})

addressRouter.put('/:id', ...addressSchema , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = new Types.ObjectId(req.params.id)
        const user = await getUserFrom(res)
        const addressRequest: AddressRequest = req.body
        const addedAddress = await updateAddress(user._id, id, addressRequest)
        return res.status(200).json(addedAddress)
    } catch (e) {
        next(e)
    }
})

addressRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = new Types.ObjectId(req.params.id)
        const user = await getUserFrom(res)
        await deleteAddressByUserIdAndId(user._id, id)
        return res.sendStatus(204)
    } catch (e) {
        next(e)
    }
})

export default addressRouter