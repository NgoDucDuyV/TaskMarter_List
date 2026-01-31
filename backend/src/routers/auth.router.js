import express from "express";
import { SignIn, SignUp, getCurrentUser, SignOut, getProfile } from "../Controllers/auth.controller.js";
import { refreshToken } from "../Controllers/refresh.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);

router.get("/profile", authMiddleware, getProfile);

router.get("/me", authMiddleware, getCurrentUser);
router.post("/refresh", refreshToken);
router.post("/logout", SignOut);

export default router;