import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/authentication.js";
import dotenv from "dotenv";

dotenv.config();

const registerController = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const { name, email, password } = req.body;

    try {
        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Validating input before hashing
        // Name validation
        if (name.length < 3 || name.length > 20) {
            return res
                .status(400)
                .json({ message: "Name must be between 3 and 20 characters" });
        }
        if (!/^[a-zA-Z ]+$/.test(name)) {
            return res
                .status(400)
                .json({ message: "Name must contain only letters" });
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        // Password validation
        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({
                message: "Password must be between 6 and 20 characters",
            });
        }
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(
                password
            )
        ) {
            return res.status(400).json({
                message:
                    "Password must have uppercase, lowercase, number & special character",
            });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user with hashed password
        const user = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({ message: messages.join(". ") });
        }

        // Handle duplicate key error (in case unique index fails)
        if (error.code === 11000) {
            return res.status(400).json({ message: "User already exists" });
        }

        res.status(500).json({ message: "Failed to register user" });
    }
};

const loginController = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase().trim() });
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
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Failed to login user" });
    }
};

const authenticateMe = async (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const { id } = verifyToken(token);
        if (!id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(id).select("name email");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.status(200).json({
            message: "User authenticated successfully",
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: "Failed to authenticate user" });
    }
};

const logoutController = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
};

export {
    registerController,
    loginController,
    authenticateMe,
    logoutController,
};
