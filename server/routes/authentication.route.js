import express from "express";
import {
    registerController,
    loginController,
    authenticateMe,
    logoutController,
} from "../controllers/authentication.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/authenticate-me", authenticateMe);
router.post("/logout", logoutController);

export default router;
