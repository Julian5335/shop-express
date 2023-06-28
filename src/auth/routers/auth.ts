import { Router } from "express";
import { addUser, login } from "../services/user-service";

const authRouter = Router();

authRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const response = await login(email, password)
        return res.status(200).json(response)
    } catch (e) {
        next(e)
    }
})

authRouter.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const addedUser = await addUser({ name, email, password })
        return res.status(201).json(addedUser)
    } catch (e) {
        next(e)
    }
})

export default authRouter;