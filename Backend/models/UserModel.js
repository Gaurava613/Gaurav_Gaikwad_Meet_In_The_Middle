// UserModel.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phoneNumber: { type: String },
    userName: { type: String },
    profileImage:{type:String},
});

export default mongoose.model("User", UserSchema);