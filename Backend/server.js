import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path'; // Import the path module
import cors from 'cors';
import UserRouter from "./routes/UserRouter.js";
import CreateMeetRouter from './routes/CreateMeetRouter.js';

dotenv.config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected Successfully'))
  .catch((err) => console.log(err, 'Error while connecting to DB'));

// Middleware
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Enable CORS 
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use(UserRouter);
app.use(CreateMeetRouter);

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on PORT:${process.env.PORT}`)
);
