import { Request, Router } from "express";
import { addUser, login } from "../services/auth.service";
import loginSchema from "../validation/login-schema";
import validate from "../../core/validation/validation-service";
import registerSchema from "../validation/register-schema";

const authRouter = Router();

authRouter.post('/login', ...loginSchema, async (req: Request, res, next) => {
    try {
        validate(req)
        const { email, password } = req.body
        const response = await login(email, password)
        return res.status(200).json(response)
    } catch (e) {
        next(e)
    }
})

authRouter.post('/register', ...registerSchema, async (req: Request, res, next) => {
    try {
        validate(req)
        const { _id, name, email, password } = req.body
        const addedUser = await addUser({ _id, name, email, password })
        return res.status(201).json(addedUser)
    } catch (e) {
        next(e)
    }
})

export default authRouter;