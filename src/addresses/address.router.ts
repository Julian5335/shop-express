import { Router, Request, Response, NextFunction } from "express";
import { getUserFrom } from "../auth/services/user-service";
import { add, get } from "./address.service";
import { IAddress } from "./address";

const addressRouter = Router()

addressRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFrom(res);
        const addresses = await get(user._id)
        return res.status(200).json(addresses)
    } catch (e) {
        next(e)
    }
})

addressRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFrom(res)
        const address: IAddress = req.body
        const addedAddress = await add(user._id, address)
        return res.status(201).json(addedAddress)
    } catch (e) {
        next(e)
    }
})

export default addressRouter