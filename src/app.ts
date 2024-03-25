import dotenv from 'dotenv';
// Configure dotenv
// Use default env file
dotenv.config()
// Switch to correct env file
dotenv.config({ path: `${process.env.PROFILE!}.env` })

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler, { NotFoundError } from './app.errors';
import { adminAuthMiddleware, authMiddleware } from './authentication/auth.middleware';
import { usersPath } from './routers/user.routers';
import { adminsPath } from './routers/admin.routers';
import routers from './routers/routers';

// Initialize the express app
const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Authentication
app.use(usersPath, authMiddleware)
app.use(adminsPath, adminAuthMiddleware)

// Routers
routers.forEach(x => app.use(x.path, x.router))
app.all("/api/*", (req, res, next) => {
    next(new NotFoundError())
})

// Error handler
app.use(errorHandler)

// Start the server
const port = process.env.PORT!
app.listen(port, () => console.log(`App started on port ${port} ...`))

// Connect to database
mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("MongoDB:", "Connected"))
    .catch((e) => console.log("MongoDB:", e.message))