import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from './auth/middleware/auth-middleware';
import authRouter from './auth/routers/auth';
import errorHandler from './errors/error-handler';
import userRouter from './user/routers/user-router';
import healthRouter from './health/health';

// Configure dotenv
// Use default env file
dotenv.config()
// Switch to correct env file
dotenv.config({ path: `${process.env.NODE_ENV!}.env` })

// Initialize the express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Middleware
app.use('/api/user', authMiddleware)

// Routers
app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// Error handling middleware
app.use(errorHandler)

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("1/2", "connected to mongodb ...");
        const port = process.env.PORT!
        app.listen(port, () => {
            console.log("2/2", `App started on port ${port} ...`);
        })
    })