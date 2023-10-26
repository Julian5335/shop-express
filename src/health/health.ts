import { Router } from "express";

const healthRouter = Router()

healthRouter.get('/', async (req, res) => {
    return res.json({
        status: 'available'
    })
})

export default healthRouter;