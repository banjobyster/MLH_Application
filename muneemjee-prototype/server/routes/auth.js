import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { signin, signup, changePassword, forgotPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/change-password", verifyToken, changePassword);
router.patch("/forgot-password", forgotPassword);

export default router;