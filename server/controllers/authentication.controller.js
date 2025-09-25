import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerController = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to check user" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to register user" });
    }
};

const loginController = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not found. Please register first" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login Successful" });
    } catch (error) {
        res.status(500).json({ message: "Failed to login user" });
    }
};

export { registerController, loginController };
