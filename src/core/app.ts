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
    routers: { url: string, router: Router }[] = []
    
    private useRouters() {
        this.app.use('/api/health', healthRouter)
        this.app.use('/api/auth', authRouter)
        this.routers.forEach(x => {
            this.app.use(x.url, x.router)
        })
    }

    addRouters(routers: { url: string, router: Router }[]) {
        this.routers = routers
        return this
    }

    connectToDb() {
        mongoose.connect(process.env.MONGO_URI!)
            .then(() => {
                console.log("MongoDB:", "Connected");
            })
            .catch((e) => {
                console.log("MongoDB:", e.message);
            })
        return this
    }
    
    run() {
         // Body Parser
         this.app.use(bodyParser.urlencoded({ extended: false }))
         this.app.use(bodyParser.json())
         
         // Authentication
         this.app.use('/api/user', authMiddleware)
         
         // Routers
         this.useRouters()
         
         // Error handler
         this.app.use(errorHandler)

        const port = process.env.PORT!
        this.app.listen(port, () => {
            console.log(`App started on port ${port} ...`);
        })
    }

}