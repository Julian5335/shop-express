import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from './auth/middleware/auth-middleware';
import authRouter from './auth/routers/auth';
import errorHandler from './errors/error-handler';
import userRouter from './user/routers/user-router';

// Configure dotenv
dotenv.config()

// Initialize the express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Middleware
app.use('/api/user', authMiddleware)

// Routers
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// Error handling middleware
app.use(errorHandler)

mongoose
    .connect('mongodb://127.0.0.1:27017/shop')
    .then(() => {
        console.log("1/2", "connected to mongodb ...");
        app.listen(process.env.PORT, () => {
            console.log("2/2", "App started ...");
        })
    })