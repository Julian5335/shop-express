import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from './auth/middleware/auth-middleware';
import authRouter from './auth/routers/auth';
import errorHandler from './core/errors/error-handler';
import healthRouter from './core/health/health';
import userProfileRouter from './user.profile/user.profile.router';
import dotenv from 'dotenv'
import addressRouter from './addresses/address.router';

// Configure dotenv
// Use default env file
dotenv.config()
// Switch to correct env file
dotenv.config({ path: `${process.env.PROFILE!}.env` })

// Initialize the express app
const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Authentication
app.use('/api/users', authMiddleware)

// Routers
app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/users/profile', userProfileRouter)
app.use('/api/users/addresses', addressRouter)

// Error handler
app.use(errorHandler)

// Start the server
const port = process.env.PORT!
app.listen(port, () => console.log(`App started on port ${port} ...`))

// Connect to database
mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("MongoDB:", "Connected"))
    .catch((e) => console.log("MongoDB:", e.message))