import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [255, "Name must be less than 255 characters"],
        match: [/^[a-zA-Z ]+$/, "Name must contain only letters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"],
        maxLength: [20, "Password must be less than 20 characters"],
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                    v
                );
            },
            message: () =>
                "Password must have uppercase, lowercase, number & special character",
        },
    },
});

const User = mongoose.model("User", userSchema);

export default User;
