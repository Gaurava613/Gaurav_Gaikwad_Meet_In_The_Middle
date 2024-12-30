import mongoose, { model } from "mongoose";

const CreateMeetSchema = new mongoose.Schema({
    meetName: String,
    date: String,
    time: String,
    duration: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model('CreateMeet', CreateMeetSchema);
