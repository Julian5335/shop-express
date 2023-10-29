import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import mongoose from 'mongoose';
import authMiddleware from './auth/middleware/auth-middleware';
import authRouter from './auth/routers/auth';
import errorHandler from './errors/error-handler';
import healthRouter from './health/health';

// Configure dotenv
// Use default env file
dotenv.config()
// Switch to correct env file
dotenv.config({ path: `${process.env.PROFILE!}.env` })

export default class App {

    // Initialize the express app
    app = express();

    constructor(routers: { url: string, router: Router }[]) {
        // Body Parser
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        
        // Authentication
        this.app.use('/api/user', authMiddleware)
        
        // Routers
        this.useRouters(routers)
        
        // Error handler
        this.app.use(errorHandler)
    }
    
    private useRouters(routers: { url: string, router: Router }[]) {
        this.app.use('/api/health', healthRouter)
        this.app.use('/api/auth', authRouter)
        routers.forEach(x => {
            this.app.use(x.url, x.router)
        })
    }

    connectToDb() {
        mongoose.connect(process.env.MONGO_URI!)
            .then(() => {
                console.log("MongoDB", "Connected");
            })
            .catch((e) => {
                console.log("MongoDB", e.message);
            })
        return this
    }
    
    run() {
        const port = process.env.PORT!
        this.app.listen(port, () => {
            console.log(`App started on port ${port} ...`);
        })
    }

}