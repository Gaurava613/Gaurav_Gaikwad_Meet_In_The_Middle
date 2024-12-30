import express from 'express';
import CreateMeetSchema from "../models/CreateMeetModel.js";
import UserModel from '../models/UserModel.js';
import authMiddleware from '../authMiddleware.js';

const router = express.Router();

router.post('/create-meet', authMiddleware, async (req, res) => {
    const { meetName, date, time, duration, description } = req.body;

    try {
        const userId = req.user.id;
        const createMeet = new CreateMeetSchema({
            meetName,
            date,
            time,
            duration,
            description,
            createdBy: userId
        });

        await createMeet.save();
        return res.json({ message: "Meet Created Successfully", data: createMeet });
    } catch (error) {
        return res.status(500).json({ message: "Error creating meet", error });
    }
});

router.get('/meets', async (req, res) => {
    const meets = await CreateMeetSchema.find().populate("createdBy", "userName phoneNumber profileImage");
    return res.json({ message: "your meets", data: meets });
});

export default router;
