import express from "express";
import authenticationRoute from "./routes/authentication.route.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

app.use(express.json());

app.use("/api/auth", authenticationRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
