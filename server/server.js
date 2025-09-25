import express from "express";
import authenticationRoute from "./routes/authentication.route.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Colbin Recruitment Platform server is functioning perfectly!");
});

app.use("/api/auth", authenticationRoute);

const start = async () => {
    const PORT = process.env.PORT || 3000;
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server due to DB connection error.");
        process.exit(1);
    }
};

start();
