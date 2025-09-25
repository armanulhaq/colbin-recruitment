import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
